import React, {useRef} from "react";
import { Link, useHistory } from "react-router-dom"
import ImageGallery from "react-image-gallery";
import "./slider.css";

const images = [
  {
      id: 1,
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    name: '909'
  },
  {
      id: 2,
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    name: '909233'
  },
  {
      id: 3,
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
    name: '090099'
  },
];


// _onImageClick(event) {
//     console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
//   }

const Slider = ({topHeadlines}) => {
  const history = useHistory()
    const imgRef = useRef()
    const clickMe = (event) => {
        console.log(imgRef, event, event?.items)
    }
    const newData = topHeadlines.slice(0,3)
  return (
    <ImageGallery
        onClick={(e)=> console.log(e)}
        // ref={imgRef}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      showBullets={false}
      showNav={false}
      items={newData}
      playInterval={2}
      //   originalHeight={'200px'}
      autoPlay={true}
      slideDuration={100}
      renderItem={(newData)=> {
          return(
            <div onClick={() =>
              history.push({
                pathname: "/details",
                state: {article: newData}
              })
            }
            >
            <img className="img-responsive w-full h-52 md:h-96 object-cover" src={newData?.urlToImage} alt={newData?.title} />
            </div>
        )
      }}
      />
  );
};

export default Slider;
