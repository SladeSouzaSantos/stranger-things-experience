gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const strokeTl = gsap.timeline({ repeat: -1 });

strokeTl.to("#preloader path", {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.inOut",
}).to("#preloader path", {
    strokeDashoffset: 1200,
    duration: 1.5,
    ease: "power2.inOut"
});

window.addEventListener("load", function() {
    const tl = gsap.timeline(
        {
        onComplete() {
            animationPage();
            gsap.to("#preloader", 
                {
                    opacity: 0,
                    display: "none",
                });
            }
        }
    );

    strokeTl.kill();

    tl.to("#preloader path", {
        strokeDashoffset: 0,
        duration: 1.0
    }).to("#preloader path", {
        fill: "rgba(168, 19, 19, 1)",
        duration: 0.5
    });
});

function animationPage(){
    ScrollSmoother.create(
        {
            smooth: 2.5,
            effects: true
        }
    );
    
    gsap.from(".hero",
        {
            opacity: 0,
            duration: 2
        }
    );
    
    gsap.from("picture:nth-child(1)",
        {
            y: -60,
            filter: "blur(20px)",
            duration: 1
        }
    );
    
    gsap.from("picture:nth-child(2)",
        {
            y: 60,
            duration: 1
        }
    );
    
    gsap.from(".card",
        {
            scrollTrigger: {
                trigger: ".cards",
                start: "top 80%",
                end: "bottom 70%",
                scrub: true
            },
            opacity: 0,
            y: 30,
            filter: "blur(20px)",
            stagger: 0.3
        }
    );
    
    gsap.from("footer",
        {
            scrollTrigger: {
                trigger: "footer",
                start: "top 80%",
                end: "bottom bottom",
                immediateRender: true,
                invalidateOnRefresh: true,
                scrub: true
            },
            y: "-30%",            
    
        }
    );
    
    const textSplitGroup = document.querySelectorAll(".textoSplit");
    
    textSplitGroup.forEach((textSplit) => {    
        const split = SplitText.create(textSplit, {type: "lines, words, chars", mask: "lines"});
        
        gsap.from(split.chars,
            {
                scrollTrigger: {
                    trigger: textSplit             
                },
                y: 40,
                opacity: 0,
                duration: 0.25,
                stagger: 0.025
            }
        );
    });
}

