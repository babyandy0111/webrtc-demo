const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const videoConstraints = {
        // width: '100%',
        // height: '90%',
        // facingMode: "user",
        facingMode: {exact: "environment"}
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 1080, height: 1920});
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var imageObj1 = new Image();
        var imageObj2 = new Image();
        imageObj1.src = imageSrc
        imageObj1.onload = function() {
           ctx.drawImage(imageObj1, 0, 0, 1080, 1920);
           imageObj2.src = "1.png";
           imageObj2.onload = function() {
              ctx.drawImage(imageObj2, 0, 0, 1080, 1920);
              var img = c.toDataURL("image/png");
              document.write('<img src="' + img + '" width="1080" height="1920"/>');
           }
        };
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return /*#__PURE__*/(
        React.createElement(React.Fragment, null, /*#__PURE__*/
            React.createElement(Webcam, {
                audio: false,
                width: '100%',
                height: '90%',
                ref: webcamRef,
                screenshotFormat: "image/png",
                videoConstraints: videoConstraints
            }), /*#__PURE__*/

            React.createElement("button", {onClick: capture}, "Capture photo"),
            imgSrc && /*#__PURE__*/
            React.createElement("img", {
                src: imgSrc
            })));
};

ReactDOM.render( /*#__PURE__*/React.createElement(WebcamCapture, null), document.getElementById("root"));
