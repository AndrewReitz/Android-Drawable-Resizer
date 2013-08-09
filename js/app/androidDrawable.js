define(["app/densities"],function(e){var t=function(t,n){if(!t)throw new TypeError("image can not be null");if(!(t instanceof Image))throw new TypeError("image must be an Image");this._density=n;var r,i,s;switch(n){case e.XHDPI:r=this._createNewImage(t,1),i=this._createNewImage(t,.75),s=this._createNewImage(t,.5);break;case e.HDPI:r=this._createNewImage(t,1.33),i=this._createNewImage(t,1),s=this._createNewImage(t,.66);break;case e.MDPI:r=this._createNewImage(t,2),i=this._createNewImage(t,1.5),s=this._createNewImage(t,1);break;default:throw new Error("Unknown density")}this.name=t.name,this.xhdpi=r,this.hdpi=i,this.mdpi=s};return t.prototype.getDrawable=function(){return{name:this.name,mdpi:this.mdpi,hdpi:this.hdpi,xhdpi:this.xhdpi}},t.prototype._createNewImage=function(e,t){var n=Math.floor(e.width*t),r=Math.floor(e.height*t),i=document.createElement("canvas");i.width=n,i.height=r;var s=i.getContext("2d");return s.drawImage(e,0,0,n,r),i.toDataURL("image/png")},t});