const Hero = () => {
  return (
    <header className="flex w-full h-full relative bg-white overflow-hidden bg-cover bg-center">
      <div className="z-50 w-full flex flex-col">
        <div className="w-full h-full mt-4 relative bg-white">
          <article
            itemScope
            itemType="https://schema.org/Person"
            className="flex flex-col bg-white w-full h-full mx-4"
          >
            <meta
              itemProp="url"
              content="https://www.ruslanmukhamedvaleev.com"
            />
            <meta itemProp="image" content="/openGraph.png" />
            <meta
              itemProp="sameAs"
              content="https://www.ruslanmukhamedvaleev.com"
            />
            <meta itemProp="sameAs" content="https://www.ruslan.in" />
            <meta itemProp="sameAs" content="https://github.com/digitalRM" />
            <meta
              itemProp="sameAs"
              content="https://www.linkedin.com/in/ruslan-muk/"
            />
            <meta
              itemProp="sameAs"
              content="https://www.instagram.com/ruslan_mk11/"
            />
            <meta
              itemProp="sameAs"
              content="https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/"
            />
            <meta itemProp="sameAs" content="https://www.foym.org" />
            <meta
              itemProp="sameAs"
              content="https://www.behance.net/mukhamedvaleev"
            />
            <meta
              itemProp="sameAs"
              content="https://dribbble.com/RuslanMukhamedvaleev"
            />
            <meta itemProp="sameAs" content="https://x.com/mukhamedvaleev" />
            <meta
              itemProp="sameAs"
              content="https://scholar.google.com/citations?user=yci2oWcAAAAJ"
            />
            <meta itemProp="alumniOf" content="Kamiak High School" />

            <h1
              itemProp="name"
              className="text-3xl text-left sm:text-3xl w-full sm:w-fit z-50 text-black font-medium tracking-tighter mt-0"
            >
              <span itemProp="givenName">Ruslan</span>{" "}
              <span itemProp="familyName">Mukhamedvaleev</span>
            </h1>

            {/* <p
              itemProp="description"
              className="text-md text-left sm:text-xl md:text-2xl z-50 text-neutral-800 max-w-2xl tracking-tighter mt-6 ml-1"
            >
              Ruslan Mukhamedvaleev is a student researcher and developer
              focused on design, machine learning, and web development.
            </p> */}
          </article>
        </div>
      </div>
    </header>
  );
};

export default Hero;
