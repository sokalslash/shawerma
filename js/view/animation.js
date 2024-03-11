function animation() {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from('.up-arrow', {
      opacity: 0,
      y: -800,
      duration: 2,
      ease: 'bounce.out',
      scrollTrigger: {
        trigger: '.shawarma__list',
        start: 'top top',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.from('.burgers__inner', {
      scale: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.burgers__inner',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      }
    })

    let mobileScreen = gsap.matchMedia();
    mobileScreen.add('(max-width: 590px)', () => {

      const shawarmaCardsCollection = document.querySelectorAll('.shawarma__item');
      shawarmaCardsCollection.forEach((card) => {
        console.log(card);
        gsap.from(card, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.8,
          scrollTrigger: {
            trigger: card,
            start: '-=300 bottom',
            toggleActions: 'play none none reverse'
          }
        })
      })

      const snacksCardsCollection = document.querySelectorAll('.snacks__item');
      snacksCardsCollection.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.8,
          scrollTrigger: {
            trigger: card,
            start: '-=300 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      const drinksCardsCollection = document.querySelectorAll('.drinks__item');
      drinksCardsCollection.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.8,
          scrollTrigger: {
            trigger: card,
            start: '-=300 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    })


    let desktoptopScreen = gsap.matchMedia();
    desktoptopScreen.add('(min-width: 591px)', () => {

      gsap.from('.shawarma__item', {
        opacity: 0,
        yPercent: 100,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.shawarma__list',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
  
      gsap.from('.snacks__item', {
        opacity: 0,
        yPercent: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.snacks__list',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
  
      gsap.from('.drinks__item', {
        opacity: 0,
        yPercent: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.drinks__list',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })
  }

  export {animation};