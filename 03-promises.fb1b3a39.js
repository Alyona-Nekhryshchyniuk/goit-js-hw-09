const e=document.querySelector("button"),t=(document.querySelector('[name="delay"]'),document.querySelector('[name="step"]'),document.querySelector('[name="amount"]').value);console.log(t);function o(e,t){Math.random()}e.addEventListener("click",((e,t,n)=>{setTimeout(o(1,0),n);for(const n=e;n>=1;n--)setTimeout(o(e,t),1e3)})());
//# sourceMappingURL=03-promises.fb1b3a39.js.map
