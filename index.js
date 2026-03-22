/* empty css                      */import{a as w,S as q,i as s}from"./assets/vendor-SA7bT8CU.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const P="https://pixabay.com/api/",R="18705792-aeb149c2876d2324648601ab5";async function m(e,o){const r={key:R,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};return(await w.get(P,{params:r})).data}const h=document.querySelector(".gallery"),B=new q(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animationSlide:!0,fadeSpeed:250,docClose:!0,disableRightClick:!1});function g(e){const o=e.map(({webformatURL:r,largeImageURL:n,tags:t,likes:a,views:l,comments:L,downloads:S})=>`
      <a href="${n}" class="gallery-item">
        <img src="${r}" alt="${t}" loading="lazy" />
        <div class="gallery-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${a}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${l}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${L}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${S}</span>
          </div>
        </div>
      </a>
    `).join("");h.insertAdjacentHTML("beforeend",o),B.refresh()}function E(){h.innerHTML=""}function y(){const e=document.querySelector(".loader-wrapper");e&&e.classList.add("visible")}function d(){const e=document.querySelector(".loader-wrapper");e&&e.classList.remove("visible")}function u(){const e=document.querySelector(".load-more");e&&e.classList.remove("is-hidden")}function p(){const e=document.querySelector(".load-more");e&&e.classList.add("is-hidden")}const v=document.getElementById("search-form"),M=document.querySelector(".load-more"),I=v.elements["search-text"],b=15;let f="",i=1,c=0;v.addEventListener("submit",async e=>{e.preventDefault();const o=I.value.trim();if(!o){s.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}f=o,i=1,c=0,p(),E(),y();try{const r=await m(f,i);if(d(),r.hits.length===0){s.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c=r.totalHits,g(r.hits),i*b<c?u():s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{d(),s.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}});M.addEventListener("click",async()=>{var e;i+=1,p(),y();try{const o=await m(f,i)}catch{u(),d(),s.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight"});return}finally{d()}if(data.hits.length>0){g(data.hits);const o=((e=document.querySelector(".gallery-item"))==null?void 0:e.getBoundingClientRect().height)||0;window.scrollBy({top:o*2,behavior:"smooth"})}i*b<c?u():(p(),s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))});
//# sourceMappingURL=index.js.map
