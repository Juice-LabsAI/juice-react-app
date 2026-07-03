// AUTO-GENERATED verbatim from the Webflow export (Task 8 carousel).
// The CSS is the exact working Webflow CSS minus its body{background} override;
// the HTML is the exact slider markup with the exact CDN image URLs + brief text.
// Do not hand-edit — kept byte-faithful to what the client shipped.

export const CAROUSEL_CSS = `@media (max-width:800px) {
    .brief-bubble::after {
    
    bottom: -45% !important;
   
}
  }
  
   @media (max-width:500px) {
    .brief-bubble::after {
    
    bottom: -30% !important;
   
}
  }

  p.geerated-text {
    text-align: center;
    font-size: 20px;
}

    @media (max-width:600px){

    p.geerated-text {
  
    font-size: 16px;
    width: 70%;
    margin: 0 auto;
}
  }
 @media (min-width:1000px){

    p.geerated-text {
  
margin-top:20px;
}
  }
  
/* brief bubble */
.brief-bubble {
    width: 624px;
    max-width: 100%;
    background: #fff;
    border: none;
   box-shadow: -4px 4px 4px 0px #505D6314;
    border-radius: 24px;
    padding: 38px 32px;
    font-family: 'Archivo', system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    color: #0b1220;
    line-height: 1.5;
    font-size: 15px;
    position: relative;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
}



/* brief pill */
.brief-pill{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -22px;
  background: #F1EEE2;
  padding: 8px 24px;
  border-radius: 1000px;
  font-size: 16px;
  color: #333333;
  letter-spacing: 12%;
  text-transform: uppercase;
  font-family: Archivo;
}

/* connector (longer drop) */
/* .brief-bubble::after{
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -50px;   /* as requested 
  width: 2px;
  height: 50px;     as requested.
  background: #888888;
  border-radius: 2px;
} */


@media (max-width:768px){
  .brief-bubble {
height: 96px;
}

}
.brief-bubble {
    display: flex !important;
    /* align-items: center; */
    height: 130px;
    /* justify-content: center; */
    /* text-align: center; */
    /* overflow: hidden; */
}

.brief-bubble::after{
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  bottom: calc(-1 * var(--brief-connector-height));

  width: 15px;
  height: 27px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 27' fill='none'%3E%3Cpath d='M6.65715 26.7071C7.04768 27.0976 7.68084 27.0976 8.07137 26.7071L14.4353 20.3431C14.8259 19.9526 14.8259 19.3195 14.4353 18.9289C14.0448 18.5384 13.4116 18.5384 13.0211 18.9289L7.36426 24.5858L1.7074 18.9289C1.31688 18.5384 0.683715 18.5384 0.293191 18.9289C-0.0973335 19.3195 -0.0973335 19.9526 0.293191 20.3431L6.65715 26.7071ZM7.36426 0L6.36426 0L6.36426 26L7.36426 26L8.36426 26L8.36426 0L7.36426 0Z' fill='%23888888'/%3E%3C/svg%3E");

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  pointer-events: none;
  opacity: 0;
  transition: opacity .65s ease, transform .65s cubic-bezier(.2,.9,.2,1);
}

/* ensure brief-center visible by default with smooth fade */
.brief-center{
  display: block;           /* ensure visible */
  opacity: 1;               /* visible by default */
  transition: opacity .36s ease, transform .36s cubic-bezier(.2,.9,.2,1);
}
.brief-text {
    font-size: 18px;
}

/* blinking cursor */
.brief-cursor {
  display:inline-block;
  width: 2px;
  height: 1em;
  background: #0b1220;
  margin-left: 6px;
  vertical-align: text-bottom;
  animation: brief-blink 1s steps(2, start) infinite;
}
@keyframes brief-blink { 50% { visibility: hidden; } }

/* idea outer spacing + max width */
.idea-outer{
  margin-top: 80px;
  display:flex;
  justify-content:center;
  box-sizing:border-box;
  max-width: 100%;
  /* hidden initially — will be shown after typing */
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .45s ease .04s, transform .45s cubic-bezier(.2,.9,.2,1) .04s;
  pointer-events: none;
}

/* show state for idea-outer */
.idea-outer.show{
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* top "THE IDEA" pill */
 .idea-pill {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -22px;
    background: #F1EEE2;
    padding: 8px 24px;
    border-radius: 999px;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
}

/* idea card visual */
.idea-card{
  /* border: 1px solid #dbdbdb2e; */
  /* box-shadow: -4px 4px 4px 0px #505D6314; converted #505D6314 to rgba */
  background: #ffffff00;
  /* border-radius: 14px; */
  padding: 0;
  position: relative;
  overflow: visible;
  transition: transform .55s cubic-bezier(.2,.9,.2,1), opacity .45s ease;
  box-sizing: border-box;
  /* keep card slightly lower/invisible until .revealed */
  transform: translateY(6px);
  opacity: 0;
}

/* reveal card when .revealed added (inner reveal) */
.idea-card.revealed{
  transform: translateY(0);
  opacity: 1;
}

/* override idea-outer max-width per your input (but center card) */
.idea-outer > .idea-card{
 max-width: 100%;
    width: 1000px;
}

/* Title using Archivo */
.idea-title {
    font-family: 'Archivo', system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    font-weight: 700;
    font-size: 36px;
    line-height: 42px;
    margin: 0 0 12px 0;
    color: #333333;
    letter-spacing: -1px;
}

/* Description using Archivo */
.idea-desc {
    margin: 0;
    color: #333333;
    font-family: 'Archivo', Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    font-size: 18px;
    line-height: 150%;
    max-width: 100%;
    box-sizing: border-box;
    letter-spacing: -1%;
}

/* Left / Right split 50/50 */
.idea-left{
 flex: 1 1 50%;
    box-sizing: border-box;
    padding-right: 18px;
    max-width: 315px;
}
.idea-right{
 flex: 0 0 auto;
    max-width: 50%;
    box-sizing: border-box;
    margin-left: auto;
}

/* image card adjustments (keep rounded corners) */
.image-card{
     width: 100%;
    max-width: 288px;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.03);
    background: linear-gradient(180deg,#fff,#fbfbfb);
    text-align: left;
    align-items: flex-end;
}

  /* .prompt-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  } */

.idea-inner {
    display: flex;
    align-items: center;
}
/* responsive tweaks: ensure 50/50 becomes stacked on small screens */
@media (max-width: 920px){
  .brief-bubble{ width: 92%; padding: 32px 16px; }
  .idea-outer{ margin-top: 40px; }
  .idea-card{ padding: 18px; }
  .idea-inner{ flex-direction: column-reverse; gap: 18px; align-items: stretch; }
  .idea-left, .idea-right{ flex: 1 1 100%; max-width: 100%; padding-right: 0; }
  
  .brief-bubble::after{ bottom: -36px; height: 36px; } /* shorter connector on mobile */
  .idea-title{ font-size: clamp(20px, 6.5vw, 32px); }
}

/* small mobile polish */
@media (max-width: 768px){
  .brief-bubble{ width: 380px; border-radius: 10px; padding: 32px 16px; margin: 0 auto; }
  .brief-bubble::after{ bottom: -28px; height: 28px; }
  .idea-card{ padding: 14px; border-radius: 12px; }
  .idea-title{ font-size: 20px; }
  .idea-desc{ font-size: 14px; line-height: 1.5; }
  .image-card {
    max-width: 100%; 
}
.idea-right { 
    margin-left: 0;
}
.idea-inner {  
    gap: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.brief-text {
  white-space: pre-wrap !important; /* preserves real newline characters */
  word-break: break-word;
}
.brief-cursor {
  display:inline-block;
  width: 2px;
  height: 1em;
  background: #0b1220;
  margin-left: 6px;
  vertical-align: text-bottom;
  animation: brief-blink 1s steps(2, start) infinite;
}
@keyframes brief-blink { 50% { visibility: hidden; } }
}
/* Connector hidden by default; will be revealed when .connector-visible is added */
/* Only changed here: transition durations slowed for a more noticeable "first line" reveal */
.brief-bubble{
  /* keep all your existing properties for .brief-bubble unchanged */
  --brief-connector-height: 60px; /* desktop default height */
  position: relative; /* ensure pseudo-element positioned correctly */
}

.brief-bubble::after{
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  bottom: calc(-1 * var(--brief-connector-height));

  width: 15px;
  height: 27px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 27' fill='none'%3E%3Cpath d='M6.65715 26.7071C7.04768 27.0976 7.68084 27.0976 8.07137 26.7071L14.4353 20.3431C14.8259 19.9526 14.8259 19.3195 14.4353 18.9289C14.0448 18.5384 13.4116 18.5384 13.0211 18.9289L7.36426 24.5858L1.7074 18.9289C1.31688 18.5384 0.683715 18.5384 0.293191 18.9289C-0.0973335 19.3195 -0.0973335 19.9526 0.293191 20.3431L6.65715 26.7071ZM7.36426 0L6.36426 0L6.36426 26L7.36426 26L8.36426 26L8.36426 0L7.36426 0Z' fill='%23888888'/%3E%3C/svg%3E");

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  pointer-events: none;
  opacity: 0;
  transition: opacity .65s ease, transform .65s cubic-bezier(.2,.9,.2,1);
}

.brief-bubble.connector-visible::after{
  opacity: 1;
  transform: translateX(-50%) translateY(0); /* slide into place */
}

/* mobile overrides — only changing the variable so sizes remain the same as before */
@media (max-width: 920px){
  .brief-bubble { --brief-connector-height: 38px; }
}

@media (max-width: 768px){
  .brief-bubble { --brief-connector-height: 28px; }
}






/* override idea-outer max-width per your input (but center card) */
.idea-outer > .idea-card{
 max-width: 100%;
    width: 1000px;
}

/* Title using Archivo */
.idea-title{
  font-family: 'Archivo', system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  font-weight: 700;
  font-size: clamp(26px, 4.5vw, 36px); /* you requested max 36px */
  line-height: 1.02;
  margin: 0 0 12px 0;
  color: #0b1220;
  letter-spacing: -0.02em;
}


/* Slider container */
/* .prompt-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
} */

/* Track */
.prompt-slider-track {
  display: flex;
  transition: transform 0.7s cubic-bezier(.2,.9,.2,1);
  width: 300%;
}

/* Each slide */
.prompt-slide {
  width: 100%;
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity .6s ease, transform .6s ease;
  pointer-events: none;
}

/* .prompt-slide.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
} */

/* Arrows */
.prompt-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
}

.prompt-arrow-left {
  left: -40px; /* Adjust for Webflow layout */
}

.prompt-arrow-right {
  right: -40px;
}

.prompt-arrow img {
  width: 22px;
  height: auto;
}

 .prompt-slider { position: relative; width: 100%; overflow: hidden; } .prompt-animation { position: relative; width: 100%; } 

 .prompt-wrap { opacity: 0; 
    pointer-events: none; 
    position: absolute; 
    width: 100%; 
    top: 0; 
    left: 0; 
    transition: opacity 1.9s ease;
  } 


 .prompt-wrap.active { opacity: 1; pointer-events: auto; position: relative; } .slider-nav { position: absolute; z-index: 20; } 
 
 .slider-btn { background: transparent; border: none; cursor: pointer; font-size: 16px; border-radius: 4px; } .slider-dots { position: absolute; bottom: unset; left: 0; right: 0; display: flex; justify-content: center; gap: 6px; z-index: 20; margin-top: 20px; } .slider-dots button { width: 13px; height: 13px; border-radius: 50%; border: none; background: #D9D9D9; cursor: pointer; } .slider-dots .active-dot { background: #FFD950; width: 37px; border-radius: 50px; } 


.image-card img{
    width: 100%;
}
.main-slider{
 position: relative;
    margin: 0 auto;
    max-width: 1000px;
}
.right-arrow-1{
   top: 0;
    right: -5%;
    bottom: -220px;
    align-self: center;
}
@media (max-width:1200px){
.right-arrow-1{
   top: 0;
    right: -5%;
    bottom: -206px;
    align-self: center;
}

}
.left-arrow-1{
     top: 0;
    left: -52px;
    bottom: -34%;
    align-self: center;
}

@media(max-width: 990px){
    .right-arrow-1{
    right: 0;
    }
    .left-arrow-1{
    left: 0;
    }
    .slider-btn{
    width: 30px;
}
.slider-nav{
    display: none;
}
}
@media(max-width: 990px){
    .idea-outer{
    margin-top: 39px;
    }
  .brief-bubble{
      height: 110px;
  }
 
}

@media(max-width: 768px){
.brief-text{
    font-size: 14px;
}
}
/*
 .brief-bubble{
    height: 130px !important;
}*/
@media(min-width: 990px)
{
.slider-dots{
  display: none;
  }
  }
  
  
  
  .gallery-wrapper {
  display: flex;
  gap: 18px;
}

/* Each item */
.gallery-item {
  position: relative;
  width: 320px;
  height: 397px;
  border-radius: 24px;
  overflow: hidden;
  transition: 0.3s ease;
}

/* .gallery-item:hover {
  transform: scale(1.04);
} */

/* Image */
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Gradient overlay */
.gallery-item::before {
  content: "";
  position: absolute;
  inset: 0;
  /* background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65)); */
}

/* Text box */
.text-box {
  position: absolute;
  left: 15px;
  right: 15px;
  color: #fff;
  z-index: 2;
}

.top-text {
  top: 15px;
}

.bottom-text {
  bottom: 15px;
}

/* Typography */
.text-box h3 {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.text-box span {
  font-size: 12px;
  display: block;
  margin-top: 6px;
}


 @media (max-width:1100px) {
    .gallery-item {
    width: 299px;
    height: 358px;
}
.main-slider {
    max-width: 930px;
}
.left-arrow-1 {
    left: -39px;

}

  }
  
  
     @media (max-width:800px) {
    
.main-slider {
    max-width: 100%;
    padding: 0 24px;
}
.gallery-item {
    width: 227px;
    height: 274px;
}
.gallery-wrapper {
    margin: 0 auto;
}
.brief-bubble {
    width: 500px;
}
  }
  
  
 @media (max-width: 500px){

  /* -------- Container -------- */
  .main-slider{
    padding: 0 12px;
  }

  /* -------- Brief Bubble -------- */

  .brief-bubble{
    width: 77vw;              /* FULL viewport width */
   

    padding: 24px 29px;             /* your required padding */
    box-sizing: border-box;    /* IMPORTANT: keeps padding inside */

    border-radius: 0;          /* optional: edge-to-edge clean look */
  }

  .brief-text{
    font-size: 14px;
    line-height: 1.4;
  }

  .brief-pill{
    font-size: 12px;
    padding: 6px 16px;
    top: -18px;
  }

  /* Connector shorter 
  .brief-bubble{
    --brief-connector-height: 24px;
  }

  /* -------- Idea Section -------- */
  .idea-outer{
    margin-top: 28px;
    padding: 0 6px;
  }

  .idea-card{
    width: 100%;
  }

  .idea-inner{
    flex-direction: column;
    gap: 20px;
    margin: 12px 0;
  }

  .idea-title{
    font-size: 20px;
    line-height: 1.2;
  }

  .idea-desc{
    font-size: 14px;
  }

  /* -------- Gallery -------- */
  .gallery-wrapper{
    gap: 8px;
    justify-content: center;
  }

  .gallery-item{
    width: 30%;        /* 3 cards fit nicely */
    height: 120px;
    border-radius: 12px;
  }

  .gallery-item img{
    object-fit: cover;
  }

  /* -------- Slider Controls -------- */
  .slider-nav{
    display: none; /* cleaner UX on small screens */
  }

  .slider-dots{
    bottom: -30px;
    gap: 5px;
  }

  .slider-dots button{
    width: 8px;
    height: 8px;
  }

  .slider-dots .active-dot{
    width: 20px;
  }

  /* -------- Prompt Wrap Fix -------- */
  .prompt-wrap{
    padding-bottom: 10px;
  }

  /* -------- Cursor -------- */
  .brief-cursor{
    height: 0.9em;
  }
  .gallery-wrapper {
    margin: 0;
}
.gallery-wrapper {
    gap: unset;
    justify-content: space-between;
}    
.gallery-wrapper {
    margin: 0;
}
.gallery-wrapper {
    gap: unset;
    justify-content: space-between;
}    


.brief-bubble {
    border-radius: 16px;
}


.idea-outer {
    padding: 0px;
}

.idea-card {
    padding: 0px;
}


}
/* Prevent any accidental overflow from children */`;

export const CAROUSEL_HTML = `<div class="main-slider">
<div class="slider-nav left-arrow-1">
    <button class="slider-btn prev"><img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/691812a328e7b970ff367e27_left-arrow.png" alt="left-arrow"></button>
    
  </div>
<div class="prompt-animation">
  
  <!-- slide 1 -->
  
  <div class="prompt-wrap" data-type-text="Position e.l.f  as the culture-first beauty brand that brings out its core features">
    <div class="brief-center">
      <div class="brief-bubble" role="status" aria-live="polite">
        <div class="brief-pill">THE BRIEF</div>
        <div class="brief-text" aria-hidden="false"></div>
      </div>
    </div>

    <div class="idea-outer">
      <div class="idea-card" role="region" aria-label="Idea card">
        
        <div class="idea-inner">
                  
             <div class="gallery-wrapper">

                    <!-- Item 1 -->
                   <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69ba4b4593d7663afffe4789_crop-image-1.png " alt="">
                      <!-- <div class="text-box top-text">
                        <h3>THE CLEAN-GIRL FILTER IN A TUBE.</h3>
                      </div> -->
                    </div>

                    <!-- Item 2 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69ba4b459deea31364a08369_crop-image-2.png" alt="">
                      <!-- <div class="text-box top-text">
                        <h3>GENETIC GLOW</h3>
                        <span>fake this instant skin</span>
                      </div> -->
                    </div>

                    <!-- Item 3 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69ba4b44a84caed4a92e7aad_b9b66d3b-80be-42f0-aca1-f6db784e1a9e.png" alt="">
                      <!-- <div class="text-box bottom-text">
                        <h3>MIRRORLESS MAGIC.</h3>
                        <span>MELT. SWIPE. GLOW.</span>
                      </div> -->
                       </div>

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- slide 2 -->
  <div class="prompt-wrap" data-type-text="Create ads for Häagen-Dazs as an indulgence that’s hard to resist">
    <div class="brief-center">
      <div class="brief-bubble" role="status" aria-live="polite">
        <div class="brief-pill">THE BRIEF</div>
        <div class="brief-text" aria-hidden="false"></div>
      </div>
    </div>

    <div class="idea-outer">
      <div class="idea-card" role="region" aria-label="Idea card">
        
        <div class="idea-inner">
       

                <div class="gallery-wrapper">

                    <!-- Item 1 -->
                   <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c2832c5afb65be6805688d_Background%20(1).png" alt="">
                      <!-- <div class="text-box top-text">
                        <h3>THE CLEAN-GIRL FILTER IN A TUBE.</h3>
                      </div> -->
                    </div>

                    <!-- Item 2 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c2832c717c4754ccfe92f6_image%20286%20(1).png" alt="">
                      <!-- <div class="text-box top-text">
                        <h3>GENETIC GLOW</h3>
                        <span>fake this instant skin</span>
                      </div> -->
                    </div>

                    <!-- Item 3 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c2832b0c47059e60e2c54e_image%20290%20(1).png" alt="">
                      <!-- <div class="text-box bottom-text">
                        <h3>MIRRORLESS MAGIC.</h3>
                        <span>MELT. SWIPE. GLOW.</span>
                      </div> -->
                       </div>

            </div>



          
        </div>
      </div>
    </div>
  </div>

<!-- end slide 2 -->

<!-- slide 3 -->
    <div class="prompt-wrap" data-type-text="Ads for Mini Cooper Electric - the same iconic brand, now in an electric avatar.">
    <div class="brief-center">
      <div class="brief-bubble" role="status" aria-live="polite">
        <div class="brief-pill">THE BRIEF</div>
        <div class="brief-text" aria-hidden="false"></div>
      </div>
    </div>

    <div class="idea-outer">
      <div class="idea-card" role="region" aria-label="Idea card">
        
        <div class="idea-inner">
       

                <div class="gallery-wrapper">

                    <!-- Item 1 -->
                   <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c3c12eed9994d89bc9519d_Background%20(2).png" alt="">
                      <!-- <div class="text-box top-text">
                        <h3>THE CLEAN-GIRL FILTER IN A TUBE.</h3>
                      </div> -->
                    </div>

                    <!-- Item 2 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c3c12ff9885dd51816a6da_image%20286%20(2).png" alt="">
                      <!-- <div class="text-box top-text">
                        <h3>GENETIC GLOW</h3>
                        <span>fake this instant skin</span>
                      </div> -->
                    </div>

                    <!-- Item 3 -->
                    <div class="gallery-item">
                      <img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/69c3c12d0a6ceb60204aabad_image%20290%20(2).png" alt="">
                      <!-- <div class="text-box bottom-text">
                        <h3>MIRRORLESS MAGIC.</h3>
                        <span>MELT. SWIPE. GLOW.</span>
                      </div> -->
                       </div>

            </div>



          
        </div>
      </div>
    </div>
  </div>


  <!-- end slide 3 -->
  <div>
    <p class="geerated-text"> Generate statics, scripts & videos across channels</p>
  </div>
</div>

<!-- Navigation -->
  <div class="slider-nav right-arrow-1">
    <button class="slider-btn next"><img src="https://cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/691812af44d0ed14e450db3e_right-arrow.png" alt="left-arrow"></button>
  </div>
  
   <!-- Pagination -->
   <div class="slider-dots"></div> 
  </div>`;
