export const user = {
  data: {
    html: "<h1>Hello!</h1><h2>I'm Rafael Vieweg</h2><p>I'm a Brazilian software developer and am currently based in London. With more than 12 years of experience in developing systems and web applications.</p>",
    excerpt: "<h1>Hello!</h1><h2>I'm Rafael Vieweg</h2><p>I'm a Brazilian software developer and am currently based in London. With more than 12 years of experience in developing systems and web applications.</p><p> I'm a full stack developer, working mainly with PHP, using the Symfony Framework, Wordpress and the entire ecosystem involved (HTML, CSS, MYSQL, JS ...), I am an attentive professional and following market trends, recently I have been improving myself in Javascript and Typescript, more specifically on the React.js and Node.js stack.</p> <address><b>Get in touch</b><br /><a href='#'>vieweg@gmail.com</a><br>07447 485834 <small>(better by text message or whatsapp)</small></address><p><b>You can find some of my latest projects below</b></p>",
    avatar: {
      url:"https://i.pinimg.com/originals/11/5f/4f/115f4f233582670e085966ee8250e75f.png",
      alt: "Rafael Vieweg - Software Developer",
      newStories: true,
      tag: false,
      size: 300,
    }
  }
}
const urlBase = process.env.NODE_ENV === "development" ? process.env.URL_LOCAL_APLICATION : process.env.URL_APLICATION
export const menu = {
  data: {
    logo : {
      url: `${urlBase}/rv-logo.svg`,
      alt: "Rafael Vieweg",
      width:32,
      height:32,
    },
    dark: true,
  _leftItems: [
    {
      id: 0,
      title: "Solutions",
      svgIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      items: [
        {
          id: 1,
          title: "Analytics",
          description:
            "Get a better understanding of where your traffic is coming from.",
          href: "/admin",
          svgIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        },
        {
          id: 2,
          title: "Engagement",
          description:
            "Speak directly to your customers in a more meaningful way.",
          href: "https://www.google.com",
        },
        {
          id: 3,
          title: "Security",
          description: "Your customers' data will be safe and secure.",
          href: "#",
          items: [
            {
              id: 1,
              title: "Analytics",
              description:
                "Get a better understanding of where your traffic is coming from.",
              href: "/admin",
              svgIcon:
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            },
            {
              id: 2,
              title: "Engagement",
              description:
                "Speak directly to your customers in a more meaningful way.",
              href: "https://www.google.com",
            },
          ]
        },
      ],
    },
    {
      id: 4,
      title: "Pricing",
      href: "/price",
    },
    {
      id: 5,
      title: "Docs",
      href: "/docs",
    },
    {
      id: 6,
      title: "More",
      items: [
        {
          id: 7,
          title: "Help Center",
          description:
            "Get all of your questions answered in our forums or contact support.",
          href: "#",
        },
        {
          id: 8,
          title: "Guides",
          description:
            "Learn how to maximize our platform to get the most out of it.",
          href: "#",
        },
        {
          id: 9,
          title: "Events",
          description:
            "See what meet-ups and other events we might be planning near you.",
          href: "#",
        },
        {
          id: 10,
          title: "Security",
          description: "Understand how we take your privacy seriously.",
          href: "#",
        },
      ],
    },
  ],
  centerItems: [
    {
      id: 4,
      title: "Home",
      href: "/",
    },
    {
      id: 5,
      title: "Articles",
      href: "#",
    },
    {
      id: 0,
      title: "Tutorials",
      items: [
        {
          id: 1,
          title: "A Simple Checkout",
          description:
            "Get a better understanding of where your traffic is coming from.",
          href: "/admin",
          svgIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        },
        {
          id: 2,
          title: "Engagement",
          description:
            "Speak directly to your customers in a more meaningful way.",
          href: "https://www.google.com",
        },
        {
          id: 3,
          title: "Security",
          description: "Your customers' data will be safe and secure.",
          href: "#",
        },
      ],
    },
    {
      id: 6,
      title: "Talk to Me",
      href: "#",
    },
  ],
  rightItems: [
    {
      id: 4,
      title: "Download CV",
      href: "#",
    },
  ],
},
};

export const links = {
  data: {
    direction: "row",
    cssClassTitle: "text-red-500 text-center text-xl font-bold",
    showTitles: false,
    links: [
      {
        id: 1,
        title: "Github",
        url: "https://github.com/vieweg",
        svgIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" class="text-red-500 hover:text-red-700" color="#24292e" height="28" width="28" xmlns="http://www.w3.org/2000/svg" style="color: rgb(36, 41, 46);"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>',
        classCssIcon: "text-red-500 hover:text-red-700",
        target: "_blank",
      },
      {
        id: 2,
        title: "linkedin",
        svgIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="text-blue-600 hover:text-blue-900" color="#1E90FF" height="28" width="28" xmlns="http://www.w3.org/2000/svg" style="color: rgb(30, 144, 255);"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>',
        url: "https://www.linkedin.com/in/vieweg/",
        target: "_blank",
        classCssIcon: "text-blue-600 hover:text-blue-900",
      },
      {
        id: 3,
        title: "Instagram",
        svgIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="text-red-600 hover:text-red-900" color="#DC143C" height="28" width="28" xmlns="http://www.w3.org/2000/svg" style="color: rgb(220, 20, 60);"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>',
        url: "https://www.instagram.com/rvieweg/",
        target: "_blank",
        classCssIcon: "text-red-600 hover:text-red-900",
      },
      {
        id: 4,
        title: "Facebook",
        url: "https://www.facebook.com/rafael.vieweg/",
        svgIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-blue-600 hover:text-blue-700" color="blue" height="28" width="28" xmlns="http://www.w3.org/2000/svg" style="color: blue;"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>',
        target: "_blank",
        classCssIcon: "text-blue-600 hover:text-blue-700",
      },
    ],
  }
}

export const articles = {
  data:
    [
      {
        id: 1,
        isNew: true,
        slug:"post-1",
        title: "Salvando alterações locais com o DevTools do browser",
        thumb:"https://por-navegantes.s3.amazonaws.com/07d53e0e303f72c58759-frontVale.png",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.\n\nVenenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.\n\n## Lorem Ipsum\n\nTristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.",
      },
      {
        id: 2,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-2",
        thumb:"https://por-navegantes.s3.amazonaws.com/0a012121ce003c580d46-frontkarlaimoveis.png",
        categories:[
          { id: 1, title: "cat1", href: "/" },
          { id: 2, title: "cat2", href: "/" },
        ]
      },
      {
        id: 3,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-3",
        thumb:"https://por-navegantes.s3.amazonaws.com/0959dc176ad6aa1531b9-FrontMOose.png",
        isNew: true,
      },
      {
        id: 4,
        slug:"post-4",
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        thumb:"https://por-navegantes.s3.amazonaws.com/3112eb4c4bdb87b303e9-FrontAcin.png",
        isNew: true,
      },
      {
        id: 5,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-5",
        thumb:"https://por-navegantes.s3.amazonaws.com/7c09bdb878af931e6bbe-EsquadriasMGraf.png",
        isNew: true,
      },
      {
        id: 6,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-6",
        thumb:"https://por-navegantes.s3.amazonaws.com/b2321c2982e499e664de-frontCOmercial.png",
        isNew: true,
      },
      {
        id: 7,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-7",
        thumb:"https://por-navegantes.s3.amazonaws.com/3210a22b37b50d0cbbc7-vivaleve.png",
        isNew: true,
      },
      {
        id: 8,
        title: "Salvando alterações locais com o DevTools do browser",
        description:"Projeto open source para visualizar repositórios do Github em 1s como se estivesse no Visual Studio Code",
        slug:"post-8",
        thumb:"https://por-navegantes.s3.amazonaws.com/0a012121ce003c580d46-frontkarlaimoveis.png",
        isNew: true,
      }
    ]
}
