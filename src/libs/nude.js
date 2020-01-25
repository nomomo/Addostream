import { ADD_DEBUG } from "libs/nomo-utils.js";

/*
* Nude.js - Nudity detection with Javascript and HTMLCanvas
*
* Author: Patrick Wied ( http://www.patrick-wied.at )
* Version: 0.1  (2010-11-21)
* License: MIT License
*/
export default function(){
    Array.prototype.remove = function(index) {
        var rest = this.slice(index + 1);
        this.length = index;
        return this.push.apply(this, rest);
    };

    var nude = (function(){
        // private var definition
        var MAX_LENGTH = 500.0;
        var canvas = null,
            ctx = null,
            skinRegions = [],
            resultFn = null,
            // img = null, // NEVER_USED
            // private functions
            initCanvas = function(){
                canvas = document.createElement("canvas");
                // the canvas should not be visible
                canvas.style.display = "none";
                var b = document.getElementsByTagName("body")[0];
                b.appendChild(canvas);
                ctx = canvas.getContext("2d");
            },
            loadImageById = function(id){
                // get the image
                var img = document.getElementById(id);
                // apply the width and height to the canvas element

                // 이미지 리사이즈
                // set size proportional to image
                var max_length = Math.max(img.width,img.height);
                if(max_length > MAX_LENGTH){
                    var ratio = MAX_LENGTH / max_length;
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    //console.log("image resize: from"+img.width+"x"+img.height+" to "+ canvas.width + "x" + canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
                else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // reset the result function
                    resultFn = null;
                    // draw the image into the canvas element
                    ctx.drawImage(img, 0, 0);
                }

            },
            loadImageByElement = function(element){
                var img = element;
                // 이미지 리사이즈
                // set size proportional to image
                var max_length = Math.max(img.width,img.height);
                if(max_length > MAX_LENGTH){
                    var ratio = MAX_LENGTH / max_length;
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    //console.log("image resize: from"+img.width+"x"+img.height+" to "+ canvas.width + "x" + canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    /*
                    // https://stackoverflow.com/a/39637827
                    var oc = document.createElement('canvas'),
                        octx = oc.getContext('2d');
                    var cur = {
                        width: Math.floor(img.width * 0.5),
                        height: Math.floor(img.height * 0.5)
                    }

                    oc.width = cur.width;
                    oc.height = cur.height;

                    octx.drawImage(img, 0, 0, cur.width, cur.height);

                    while (cur.width * 0.5 > img.width * ratio) {
                        cur = {
                            width: Math.floor(cur.width * 0.5),
                            height: Math.floor(cur.height * 0.5)
                        };
                        octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
                    }
                    ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
                    */
                }
                else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // reset the result function
                    resultFn = null;
                    // draw the image into the canvas element
                    ctx.drawImage(img, 0, 0);
                }
            },
            scanImage = function(){
                // get the image data
                var image = ctx.getImageData(0, 0, canvas.width, canvas.height),
                    imageData = image.data,
                    skinMap = [],
                    detectedRegions = [],
                    mergeRegions = [],
                    width = canvas.width,
                    lastFrom = -1,
                    lastTo = -1;


                var addMerge = function(from, to){
                    lastFrom = from;
                    lastTo = to;
                    var len = mergeRegions.length,
                        fromIndex = -1,
                        toIndex = -1;


                    while(len--){

                        var region = mergeRegions[len],
                            rlen = region.length;

                        while(rlen--){

                            if(region[rlen] == from){
                                fromIndex = len;
                            }

                            if(region[rlen] == to){
                                toIndex = len;
                            }

                        }

                    }

                    if(fromIndex != -1 && toIndex != -1 && fromIndex == toIndex){
                        return;
                    }

                    if(fromIndex == -1 && toIndex == -1){

                        mergeRegions.push([from, to]);

                        return;
                    }
                    if(fromIndex != -1 && toIndex == -1){

                        mergeRegions[fromIndex].push(to);
                        return;
                    }
                    if(fromIndex == -1 && toIndex != -1){
                        mergeRegions[toIndex].push(from);
                        return;
                    }

                    if(fromIndex != -1 && toIndex != -1 && fromIndex != toIndex){
                        mergeRegions[fromIndex] = mergeRegions[fromIndex].concat(mergeRegions[toIndex]);
                        mergeRegions.remove(toIndex);
                        return;
                    }

                };

                // iterate the image from the top left to the bottom right
                var length = imageData.length;
                width = canvas.width;

                for(var i = 0, u = 1; i < length; i+=4, u++){

                    var r = imageData[i],
                        g = imageData[i+1],
                        b = imageData[i+2],
                        x = (u>width)?((u%width)-1):u,
                        y = (u>width)?(Math.ceil(u/width)-1):1;

                    if(classifySkin(r, g, b)){ //
                        skinMap.push({"id": u, "skin": true, "region": 0, "x": x, "y": y, "checked": false});

                        var region = -1,
                            checkIndexes = [u-2, (u-width)-2, u-width-1, (u-width)],
                            checker = false;

                        for(var o = 0; o < 4; o++){
                            var index = checkIndexes[o];
                            if(skinMap[index] && skinMap[index].skin){
                                if(skinMap[index].region!=region && region!=-1 && lastFrom!=region && lastTo!=skinMap[index].region){
                                    addMerge(region, skinMap[index].region);
                                }
                                region = skinMap[index].region;
                                checker = true;
                            }
                        }

                        if(!checker){
                            skinMap[u-1].region = detectedRegions.length;
                            detectedRegions.push([skinMap[u-1]]);
                            continue;
                        }else{

                            if(region > -1){

                                if(!detectedRegions[region]){
                                    detectedRegions[region] = [];
                                }

                                skinMap[u-1].region = region;
                                detectedRegions[region].push(skinMap[u-1]);

                            }
                        }

                    }else{
                        skinMap.push({"id": u, "skin": false, "region": 0, "x": x, "y": y, "checked": false});
                    }

                }

                merge(detectedRegions, mergeRegions);
                analyseRegions();
            },
            // function for merging detected regions
            merge = function(detectedRegions, mergeRegions){

                var length = mergeRegions.length,
                    detRegions = [];


                // merging detected regions
                while(length--){

                    var region = mergeRegions[length],
                        rlen = region.length;

                    if(!detRegions[length])
                        detRegions[length] = [];

                    while(rlen--){
                        var index = region[rlen];
                        detRegions[length] = detRegions[length].concat(detectedRegions[index]);
                        detectedRegions[index] = [];
                    }

                }

                // push the rest of the regions to the detRegions array
                // (regions without merging)
                var l = detectedRegions.length;
                while(l--){
                    if(detectedRegions[l].length > 0){
                        detRegions.push(detectedRegions[l]);
                    }
                }

                // clean up
                clearRegions(detRegions);

            },
            // clean up function
            // only pushes regions which are bigger than a specific amount to the final result
            clearRegions = function(detectedRegions){

                var length = detectedRegions.length;

                for(var i=0; i < length; i++){
                    if(detectedRegions[i].length > 30){
                        skinRegions.push(detectedRegions[i]);
                    }
                }

            },
            analyseRegions = function(){

                // sort the detected regions by size
                var length = skinRegions.length,
                    totalPixels = canvas.width * canvas.height,
                    totalSkin = 0;

                // if there are less than 3 regions
                if(length < 3){
                    resultHandler(false);
                    return;
                }

                // sort the skinRegions with bubble sort algorithm
                (function(){
                    var sorted = false;
                    while(!sorted){
                        sorted = true;
                        for(var i = 0; i < length-1; i++){
                            if(skinRegions[i].length < skinRegions[i+1].length){
                                sorted = false;
                                var temp = skinRegions[i];
                                skinRegions[i] = skinRegions[i+1];
                                skinRegions[i+1] = temp;
                            }
                        }
                    }
                })();

                // count total skin pixels
                while(length--){
                    totalSkin += skinRegions[length].length;
                }

                var text1 = "skin regions length" + skinRegions.length;
                var text2 = "the biggest areas :" + ((skinRegions[0].length/totalSkin)*100) + "%, " + ((skinRegions[1].length/totalSkin)*100)+"%, "+((skinRegions[2].length/totalSkin)*100)+"%";
                if(typeof ADD_DEBUG === "function"){
                    ADD_DEBUG(text1);
                    ADD_DEBUG(text2);
                }
                else{
                    console.log(text1);
                    console.log(text2);
                }

                // check if there are more than 15% skin pixel in the image
                if((totalSkin/totalPixels)*100 < 15){
                    // if the percentage lower than 15, it's not nude!
                    //console.log("it's not nude :) - total skin percent is "+((totalSkin/totalPixels)*100)+"% ");
                    resultHandler(false);
                    return;
                }

                // check if the largest skin region is less than 35% of the total skin count
                // AND if the second largest region is less than 30% of the total skin count
                // AND if the third largest region is less than 30% of the total skin count
                if((skinRegions[0].length/totalSkin)*100 < 35
                        && (skinRegions[1].length/totalSkin)*100 < 30
                        && (skinRegions[2].length/totalSkin)*100 < 30){
                    // the image is not nude.
                    //console.log("it's not nude :) - less than 35%,30%,30% skin in the biggest areas :" + ((skinRegions[0].length/totalSkin)*100) + "%, " + ((skinRegions[1].length/totalSkin)*100)+"%, "+((skinRegions[2].length/totalSkin)*100)+"%");
                    resultHandler(false);
                    return;

                }

                // check if the number of skin pixels in the largest region is less than 45% of the total skin count
                if((skinRegions[0].length/totalSkin)*100 < 45){
                    // it's not nude
                    //console.log("it's not nude :) - the biggest region contains less than 45%: "+((skinRegions[0].length/totalSkin)*100)+"%");
                    resultHandler(false);
                    return;
                }

                // TODO:
                // build the bounding polygon by the regions edge values:
                // Identify the leftmost, the uppermost, the rightmost, and the lowermost skin pixels of the three largest skin regions.
                // Use these points as the corner points of a bounding polygon.

                // TODO:
                // check if the total skin count is less than 30% of the total number of pixels
                // AND the number of skin pixels within the bounding polygon is less than 55% of the size of the polygon
                // if this condition is true, it's not nude.

                // TODO: include bounding polygon functionality
                // if there are more than 60 skin regions and the average intensity within the polygon is less than 0.25
                // the image is not nude
                if(skinRegions.length > 60){
                    //console.log("it's not nude :) - more than 60 skin regions", skinRegions.length);
                    resultHandler(false);
                    return;
                }


                // otherwise it is nude
                resultHandler(true);

            },
            // the result handler will be executed when the analysing process is done
            // the result contains true (it is nude) or false (it is not nude)
            // if the user passed an result function to the scan function, the result function will be executed
            // otherwise the default resulthandling executes
            resultHandler = function(result){

                if(resultFn){
                    resultFn(result);
                }else{
                    if(result){
                        //console.log("the picture contains nudity");
                    }
                }

            },
            classifySkin = function(r, g, b){
                // A Survey on Pixel-Based Skin Color Detection Techniques
                var rgbClassifier = ((r>95) && (g>40 && g <100) && (b>20) && ((Math.max(r,g,b) - Math.min(r,g,b)) > 15) && (Math.abs(r-g)>15) && (r > g) && (r > b)),
                    nurgb = toNormalizedRgb(r, g, b),
                    nr = nurgb[0],
                    ng = nurgb[1],
                    normRgbClassifier = (((nr/ng)>1.185) && (((r*b)/(Math.pow(r+g+b,2))) > 0.107) && (((r*g)/(Math.pow(r+g+b,2))) > 0.112)),
                    hsv = toHsvTest(r, g, b),
                    h = hsv[0],
                    s = hsv[1],
                    hsvClassifier = (h > 0 && h < 35 && s > 0.23 && s < 0.68);

                return (rgbClassifier || normRgbClassifier || hsvClassifier); //
            },
            toHsvTest = function(r, g, b){
                var h = 0,
                    mx = Math.max(r, g, b),
                    mn = Math.min(r, g, b),
                    dif = mx - mn;

                if(mx == r){
                    h = (g - b)/dif;
                }else if(mx == g){
                    h = 2+((g - r)/dif);
                }else{
                    h = 4+((r - g)/dif);
                }
                h = h*60;
                if(h < 0){
                    h = h+360;
                }

                return [h, 1-(3*((Math.min(r,g,b))/(r+g+b))),(1/3)*(r+g+b)] ;

            },
            toNormalizedRgb = function(r, g, b){
                var sum = r+g+b;
                return [(r/sum), (g/sum), (b/sum)];
            };

        // public interface
        return {
            init: function(){
                initCanvas();
            },
            load: function(param){
                if(typeof(param) == "string"){
                    loadImageById(param);
                }else{
                    loadImageByElement(param);
                }
            },
            scan: function(fn){
                if(arguments.length>0 && typeof(arguments[0]) == "function"){
                    resultFn = fn;
                }
                scanImage();

                // 글로벌 변수 초기화
                skinRegions = [];
                resultFn = null;
                // img = null;
            },
            checkNudeImage(node) {
                var returnVal = false;
                if(typeof nude !== undefined){
                    nude.init();
                    nude.load(node);
                    // Scan it
                    nude.scan(function(result){
                        if(result){
                            ADD_DEBUG("피부톤 이미지 발견!");
                            returnVal = true;
                        }
                        else{
                            ADD_DEBUG("Nudity 통과");
                            returnVal = false;
                        }
                    });
                }
                return returnVal;
            }
        };
    })();
    // register nude at window object
    window.nude = nude;
}

// ▼ 사용법
// function checkNudeImage(node) {
//     var returnVal = false;
//     if(typeof nude !== undefined){
//         nude.load(node);
//         // Scan it
//         nude.scan(function(result){
//             if(result){
//                 ADD_DEBUG("피부톤 이미지 발견!");
//                 returnVal = true;
//             }
//             else{
//                 ADD_DEBUG("Nudity 통과");
//                 returnVal = false;
//             }
//         });
//     }
//     return returnVal;
// }