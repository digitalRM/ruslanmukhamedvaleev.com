"use client";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

// Tetris piece shapes
const PIECES = [
  // I-piece
  [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
  // O-piece
  [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  // T-piece
  [
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
  ],
  // S-piece
  [
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  ],
  // Z-piece
  [
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ],
  // J-piece
  [
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  ],
  // L-piece
  [
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
  ],
];

const BLOCK_SIZE = 95; // Fixed block size for consistent gameplay

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  position: Position;
  pieceIndex: number;
  rotationIndex: number;
}

const createEmptyBoard = (width: number, height: number): number[][] => {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(0));
};

const getRandomPiece = (boardWidth: number): Piece => {
  const pieceIndex = Math.floor(Math.random() * PIECES.length);
  const rotationIndex = 0;
  return {
    shape: PIECES[pieceIndex][rotationIndex],
    position: { x: Math.floor(boardWidth / 2) - 1, y: 0 },
    pieceIndex,
    rotationIndex,
  };
};

const isValidPosition = (
  board: number[][],
  piece: Piece,
  boardWidth: number,
  boardHeight: number
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.position.x + x;
        const newY = piece.position.y + y;

        if (
          newX < 0 ||
          newX >= boardWidth ||
          newY >= boardHeight ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

const placePiece = (board: number[][], piece: Piece): number[][] => {
  const newBoard = board.map((row) => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = 1;
        }
      }
    }
  }

  return newBoard;
};

const clearLines = (
  board: number[][],
  boardWidth: number
): { newBoard: number[][]; linesCleared: number } => {
  const newBoard = board.filter((row) => row.some((cell) => cell === 0));
  const linesCleared = board.length - newBoard.length;

  while (newBoard.length < board.length) {
    newBoard.unshift(Array(boardWidth).fill(0));
  }

  return { newBoard, linesCleared };
};

interface TetrisProps {
  isVisible: boolean;
  onVisibilityChange: (visible: boolean) => void;
}

export interface TetrisRef {
  resetGame: () => void;
}

const Tetris = forwardRef<TetrisRef, TetrisProps>(
  ({ isVisible, onVisibilityChange }, ref) => {
    const [board, setBoard] = useState<number[][]>(() =>
      createEmptyBoard(20, 20)
    ); // Default before screen size calculated
    const [currentPiece, setCurrentPiece] = useState<Piece>(() =>
      getRandomPiece(20)
    );
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [boardWidth, setBoardWidth] = useState(20);
    const [boardHeight, setBoardHeight] = useState(20);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const dropTimeRef = useRef(500);

    // Calculate board dimensions dynamically based on screen size
    useEffect(() => {
      const updateDimensions = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate how many blocks fit in each dimension
        const newBoardWidth = Math.floor(windowWidth / BLOCK_SIZE) + 2; // Add 2 for left and right extension
        const newBoardHeight = Math.floor(windowHeight / BLOCK_SIZE);

        // Ensure minimum viable game area (at least 4x4 for pieces to fit)
        const finalBoardWidth = Math.max(newBoardWidth, 4);
        const finalBoardHeight = Math.max(newBoardHeight, 4);

        setBoardWidth(finalBoardWidth);
        setBoardHeight(finalBoardHeight);
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Reset board when dimensions change
    useEffect(() => {
      setBoard(createEmptyBoard(boardWidth, boardHeight));
      setCurrentPiece(getRandomPiece(boardWidth));
      setGameOver(false);
      setScore(0); // Reset score when board changes to keep it fair
    }, [boardWidth, boardHeight]);

    const movePiece = useCallback(
      (dx: number, dy: number) => {
        if (gameOver) return;

        const newPiece = {
          ...currentPiece,
          position: {
            x: currentPiece.position.x + dx,
            y: currentPiece.position.y + dy,
          },
        };

        if (isValidPosition(board, newPiece, boardWidth, boardHeight)) {
          setCurrentPiece(newPiece);
          return true;
        }
        return false;
      },
      [board, currentPiece, gameOver, boardWidth, boardHeight]
    );

    const rotatePiece = useCallback(() => {
      if (gameOver) return;

      const nextRotationIndex =
        (currentPiece.rotationIndex + 1) %
        PIECES[currentPiece.pieceIndex].length;
      const rotatedPiece = {
        ...currentPiece,
        shape: PIECES[currentPiece.pieceIndex][nextRotationIndex],
        rotationIndex: nextRotationIndex,
      };

      if (isValidPosition(board, rotatedPiece, boardWidth, boardHeight)) {
        setCurrentPiece(rotatedPiece);
      }
    }, [board, currentPiece, gameOver, boardWidth, boardHeight]);

    const dropPiece = useCallback(() => {
      if (!movePiece(0, 1)) {
        // Piece can't move down, place it
        const newBoard = placePiece(board, currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(
          newBoard,
          boardWidth
        );

        setBoard(clearedBoard);
        setScore((prev) => prev + linesCleared * 100);

        const nextPiece = getRandomPiece(boardWidth);
        if (
          !isValidPosition(clearedBoard, nextPiece, boardWidth, boardHeight)
        ) {
          setGameOver(true);
          return;
        }

        setCurrentPiece(nextPiece);
      }
    }, [board, currentPiece, movePiece, boardWidth, boardHeight]);

    const hardDrop = useCallback(() => {
      if (gameOver) return;

      const newPiece = { ...currentPiece };
      while (
        isValidPosition(
          board,
          {
            ...newPiece,
            position: { x: newPiece.position.x, y: newPiece.position.y + 1 },
          },
          boardWidth,
          boardHeight
        )
      ) {
        newPiece.position.y += 1;
      }

      setCurrentPiece(newPiece);
      dropPiece();
    }, [board, currentPiece, gameOver, dropPiece, boardWidth, boardHeight]);

    const resetGame = useCallback(() => {
      setBoard(createEmptyBoard(boardWidth, boardHeight));
      setCurrentPiece(getRandomPiece(boardWidth));
      setGameOver(false);
      setScore(0);
    }, [boardWidth, boardHeight]);

    // Expose resetGame function to parent component
    useImperativeHandle(
      ref,
      () => ({
        resetGame,
      }),
      [resetGame]
    );

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (!isVisible) return;

        switch (e.key) {
          case "ArrowLeft":
            movePiece(-1, 0);
            break;
          case "ArrowRight":
            movePiece(1, 0);
            break;
          case "ArrowDown":
            dropPiece();
            break;
          case "ArrowUp":
            rotatePiece();
            break;
          case " ":
            e.preventDefault();
            hardDrop();
            break;
          case "r":
          case "R":
            resetGame();
            break;
          case "Escape":
            onVisibilityChange(false);
            break;
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }, [
      isVisible,
      movePiece,
      dropPiece,
      rotatePiece,
      hardDrop,
      resetGame,
      onVisibilityChange,
    ]);

    useEffect(() => {
      if (isVisible && !gameOver) {
        gameLoopRef.current = setInterval(dropPiece, dropTimeRef.current);
        return () => {
          if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
          }
        };
      }
    }, [isVisible, gameOver, dropPiece]);

    const renderBoard = () => {
      const displayBoard = board.map((row) => [...row]);

      // Add current piece to display board
      if (!gameOver) {
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
              const boardY = currentPiece.position.y + y;
              const boardX = currentPiece.position.x + x;
              if (
                boardY >= 0 &&
                boardY < boardHeight &&
                boardX >= 0 &&
                boardX < boardWidth
              ) {
                displayBoard[boardY][boardX] = 1;
              }
            }
          }
        }
      }

      return displayBoard;
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white z-[60] pointer-events-none" />
        <div className="relative bg-transparent w-full h-full flex items-end justify-center">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${boardWidth}, ${BLOCK_SIZE}px)`,
              gridTemplateRows: `repeat(${boardHeight}, ${BLOCK_SIZE}px)`,
            }}
          >
            {renderBoard().map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={` -transparent border-t-neutral-200 border-l-neutral-200 ${
                    cell ? "bg-black" : "bg-transparent"
                  }`}
                  style={{
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                  }}
                />
              ))
            )}
          </div>

          {/* Floating score display */}
          <div
            className={`absolute bottom-4 open-runde-semibold left-4 text-black text-xl font-bold  bg-opacity-80 px-3 py-1.5 rounded-full z-[100] tracking-tight ${
              renderBoard()[boardHeight - 1][1] ? "invert" : ""
            }`}
          >
            Score: {score}
          </div>
          {gameOver && (
            <div
              className={`absolute bottom-16 open-runde-semibold left-4 text-black text-xl font-bold bg-opacity-80 px-3 py-1.5 rounded-full z-[100] tracking-tight ${
                renderBoard()[boardHeight - 3][0] ? "bg-black text-red-600" : ""
              }`}
            >
              <div className="text-red-400">Game Over! Press R to restart</div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Tetris.displayName = "Tetris";

export default Tetris;
