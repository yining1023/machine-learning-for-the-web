function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

let images = document.getElementsByTagName('img');
for(let i = 0; i < images.length; i++) {
  setTimeout(function() {
    toDataURL(
      images[i].src,
      function(dataUrl) {
        chrome.runtime.sendMessage({msg: 'image', index: i, image: dataUrl}, function({data, index}) {
          images[index].alt = data;
          let div = document.createElement("div");
          div.innerText = JSON.stringify(data);
          div.setAttribute("style", "background-color:yellow; color:black; z-index:99999");
          let parent = images[index].parentNode;
          parent.insertBefore(div, images[index]); 
        });
      },
      'image/jpeg'
    )
  }, i * 5000);
}
