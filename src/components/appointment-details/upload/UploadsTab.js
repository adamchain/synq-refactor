import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  Modal as AntModal,
  Row,
  Col,
  Button,
  Typography,
  Image as AntImage,
} from "antd";
import moment from "moment";
import {
  CloseOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FileImageTwoTone,
} from "@ant-design/icons";
import UploadModal from "./UploadModal";
import "./Upload.scss";
//import u1816 from "./../../../images/u1816.png";
//mport u1819 from "./../../../images/u1819.png";
import UploadFileServices from "./../../../services/UploadFileServices";
import { localMoment, momentLocal } from "../../util/TimeUtil";
import { UploadsEmpty } from "../../util/EmptySvgUtil";
import NewUploadModal from "./NewUploadModal";
//import { TrashIcon } from "../../util/SvgUtil";
//import  PDFImage  from  "../../../images/WhskrPDFTile.png"
import { CommonContext } from "../../../context/CommonContext";

const { Text, Title } = Typography;

const photos = [
  // {
  //   src: u1816,
  //   sizes:"(min-width: 50px)"
  // },
  // {
  //   src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
  //   width: 1,
  //   height: 1
  // },
  // {
  //   src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
  //   width: 3,
  //   height: 4
  // },
  // {
  //   src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
  //   width: 3,
  //   height: 4
  // },
  // {
  //   src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
  //   width: 3,
  //   height: 4
  // },
  // {
  //   src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
  //   width: 4,
  //   height: 3
  // },
  // {
  //   src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
  //   width: 3,
  //   height: 4
  // },
  // {
  //   src: "https://source.unsplash.com/PpOHJezOalU/800x599",
  //   width: 4,
  //   height: 3
  // },
  // {
  //   src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
  //   width: 4,
  //   height: 3
  // }
];

const UploadsTab = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [imgs, setImgs] = useState({ data: [], allLoaded: false });
  const context = useContext(CommonContext);
  //const [imgs,setImgs] = useState({total:0,data:[],allLoaded:false,edittedNameObject:{}});
  useEffect(() => {
    if (props.patientId) {
      fetchAllImages();
    }
  }, [props.patientId]);

  const fetchAllImages = () => {
    UploadFileServices.getAllFilesForPatient(props.patientId, (data) => {
      let images = [];
      let edittedNameObject = {};
      data.forEach((k) => {
        //let htmlImage = k.htmlImage;
        //let aspectRatio = aspect_ratio(htmlImage.width/htmlImage.height);

        images.push({
          id: k.id,
          src: k.filePath,
          realName: k.fileName,
          date: k.createdTime,
          width: 4,
          height: 3,
        });

        edittedNameObject[k.fileName] = {
          name: k.fileName,
          isEdit: false,
        };
      });
      setImgs({
        total: data.length,
        allLoaded: true,
        data: images,
        edittedNameObject,
      });
    });
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (
      imgs.allLoaded === false &&
      imgs.total !== 0 &&
      imgs.total === imgs.data.length
    ) {
      setImgs((k) => ({ ...k, allLoaded: true }));
    }
  }, [imgs]);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const findDimension = (x, y) => {
    let firstValue = x;
    let secondValue = y;

    if (secondValue > firstValue) {
      firstValue = y;
      secondValue = x;
    }

    let first = (secondValue / firstValue) * 5;
    let second = 5 / first;

    return { first, second };
  };

  const aspect_ratio = (val, lim) => {
    var lower = [0, 1];
    var upper = [1, 0];

    while (true) {
      var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

      if (val * mediant[1] > mediant[0]) {
        if (lim < mediant[1]) {
          return upper;
        }
        lower = mediant;
      } else if (val * mediant[1] == mediant[0]) {
        if (lim >= mediant[1]) {
          return mediant;
        }
        if (lower[1] < upper[1]) {
          return lower;
        }
        return upper;
      } else {
        if (lim < mediant[1]) {
          return lower;
        }
        upper = mediant;
      }
    }
  };

  const _url = (file, updateData) => {
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      let orgWidth = img.width;
      let orgHeight = img.height;
      //let {first,second} = findDimension(orgWidth,orgHeight);
      let a = aspect_ratio(orgWidth / orgHeight);
      //let width = first; //orgWidth/orgHeight;
      //let height = second; //orgHeight/orgWidth
      //  if(orgHeight>orgWidth){
      //   width = second;
      //   height = first;
      //  }
      //  setImgs(k=>({...k,data:[...k.data,{realName:file.name,src: window.URL.createObjectURL(file),width,height}]}))

      updateData((k) => [
        ...k,
        {
          realName: file.name,
          src: window.URL.createObjectURL(file),
          width: a[0],
          height: a[1],
        },
      ]);
    };
    // let reader = new FileReader();
    // let url = reader.readAsDataURL(file);
    //  reader.onloadend =  (e) => {
    //      let temp = new Image();
    //      temp.src  =e.target.result;
    //     setUrls(k=>([...k,{width:temp.width,height:temp.height,name:""}]))
    //   }
  };

  const onFilesUpload = (e) => {
    let fileArray = Array.from(e.target.files);
    setImgs((k) => ({ ...k, total: fileArray.length }));
    Array.from(e.target.files).forEach((element) => {
      _url(element);
    });
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = (tempProps) => {
    let newProps = {
      ...tempProps.photo,
      preview: {
        visible: false,
        mask: (
          <Row justify="center" align="middle">
            <Col span={24}>
              <Row justify="center" align="middle">
                <Col span={18}>
                  <p style={{ color: "white" }}>
                    {imgs.edittedNameObject[tempProps.photo.realName].name}
                  </p>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col span={18}>
                  <p>
                    {momentLocal(tempProps.photo.date).format("MM/DD/YYYY")}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        ),
      },
    };
    let isPdf =
      tempProps.photo.src.includes(".pdf") ||
      tempProps.photo.src.includes(".doc") ||
      tempProps.photo.src.includes(".docx");
    //if (isPdf) { newProps.src = PDFImage }
    return (
      <AntImage
        onClick={(e) => {
          e.preventDefault();
          if (isPdf) {
            window.open(tempProps.photo.src, "_blank", "noreferrer");
          } else {
            setCurrentImage(tempProps.index);
            setViewerIsOpen(true);
          }
        }}
        className="upload-gallery"
        {...newProps}
      />
    );
  };
  const CustomHeaderClose = (insideProps) => {
    return (
      <div
        style={{ float: "left", marginTop: "12px" }}
        {...insideProps.innerProps}
      >
        <>
          <DeleteOutlined
            title="Delete Image"
            className="uploadsDelete"
            style={{ color: "white", fontSize: "30px" }}
            onClick={() => {
              UploadFileServices.deleteFilesForPatient(
                props.patientId,
                imgs.data[currentImage].id,
                fetchAllImages,
              );
            }}
          />
          <CloseOutlined
            className="uploadsClose"
            onClick={(e) => {}}
            style={{
              marginLeft: "10px",
              float: "right",
              color: "white",
              fontSize: "30px",
            }}
          />
        </>
      </div>
    );
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            justify="space-between"
            className="table-title-top"
            align="middle"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Uploads</Title>
            </Col>
            {context.userProfile.permission !== "FD" && (
              <Col>
                <Button
                  ghost
                  shape="round"
                  size="small"
                  type="primary"
                  style={{ minWidth: "130px" }}
                  onClick={() => {
                    setIsUploadModalOpen(true);
                  }}
                >
                  Upload
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {/* <input type="file" multiple onChange={(e)=>{
        onFilesUpload(e)
    }} /> */}
      {imgs.data.length > 0 ? (
        <>
          <Gallery
            style={{ width: "100px", height: "100px" }}
            photos={imgs.allLoaded ? imgs.data : []}
            renderImage={imageRenderer}
            limitNodeSearch={4}
            onClick={openLightbox}
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  trackProps={{
                    onViewChange: (number) => {
                      setCurrentImage(number);
                    },
                  }}
                  currentIndex={currentImage}
                  components={{ HeaderClose: CustomHeaderClose }}
                  views={(imgs.allLoaded ? imgs.data : []).map((x) => ({
                    ...x,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </>
      ) : (
        <div style={{ padding: "2em" }}>
          <Row style={{ marginBottom: "10px" }} justify="center" align="middle">
            <Col>
              <UploadsEmpty />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col>
              <Text className="empty-text">No Media Available</Text>
            </Col>
          </Row>
        </div>
      )}
      {isUploadModalOpen && (
        <NewUploadModal
          patientId={props.patientId}
          _url={_url}
          onClose={() => {
            setIsUploadModalOpen(false);
          }}
          // onSuccess={(edittedNameObject,data)=>{
          //   setImgs(k=>({...k,data:[...k.data,...data],total:(k.data.length+data.length),edittedNameObject:{...k.edittedNameObject,...edittedNameObject}}));
          //   setIsUploadModalOpen(false);
          //    }}
          onSuccess={() => {
            fetchAllImages();
          }}
        />
      )}
    </>
  );
};
export default UploadsTab;
