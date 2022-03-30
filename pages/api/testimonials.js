export default function handler(req, res) {
    res.status(200).json(
       [
        {
          id: 1,
          desc: 'I was truly happy to be able to hire a local company to help me brand my business. I had a vision on what I wanted our website to look like and Websolutions made this vision become a reality. They designed a website that was perfectly reflective of our industry and services. The colours, layout and design of the website is exactly what I had envisioned and the best part, is that I had never told them what to do, it was entirely designed by the team. I am proud to say that my branding was elevated by Websolutions and that it was done localy. Thank you Websolutions, great to do business with you.',
          name: 'Marc-Andre Boudreau',
          company: 'CEO of Club Des Amis',
          imageUrl: '/images/testimonial/placeholder.jpg'
        },
         
        {
            id: 2,
            desc: 'Websolution.ca\'s shop management system was a custom built IT solution that not only allowed us to greatly increase our company\'s efficiency but also, in turn, had a direct positive impact on our sales and overall customer satisfaction. Our continued partnership with Websolutions.ca truly allows us to stay ahead of our competition.',
            name: 'Todd Morrison',
            company: 'President, Rogers Electric Motor Service',
            imageUrl: '/images/testimonial/placeholder.jpg'
        },

        {
            id: 2,
            desc: 'We\'ve been a customer of Websolutions for almost a year. Their products & customer service are excellent. They have an experienced, knowledgeable staff who are always available to answer questions or offer advice and are up-to-date with the most recent technology and social media.',
            name: 'Rachel Bastarache',
            company: 'Director, HR & Corporate Strategy @ GoToInsure.ca',
            imageUrl: '/images/testimonial/placeholder.jpg'
        },
    ]
    )
  }
  