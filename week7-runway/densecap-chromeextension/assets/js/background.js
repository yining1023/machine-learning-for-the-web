chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
  if(message.msg === "image") {
    const inputs = {
      "image": message.image,
      "max_detections": 5
    };

    fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(outputs => {
        const { bboxes, classes, scores } = outputs;
        senderResponse({data: classes, index: message.index});
      })
      .catch(error => console.log("error", error))

    return true;  // Will respond asynchronously.
  }
});
