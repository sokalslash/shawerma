function animation() {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from('.arrow-wrapper', {
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
  
    gsap.from('.shawarma__item', {
      opacity: 0,
      yPercent: 100,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.shawarma__list',
        start: 'top bottom',
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
    
    gsap.from('.snacks__item', {
      opacity: 0,
      yPercent: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.snacks__list',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      }
    })
  
    gsap.from('.drinks__item', {
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.drinks__list',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      }
    })
  }

  export {animation};