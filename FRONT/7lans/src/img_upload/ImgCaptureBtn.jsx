import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import {getDownloadURL, getStorage, uploadBytesResumable, ref as strRef} from 'firebase/storage';
import {update, ref as dbRef} from 'firebase/database';
import {useDispatch, useSelector} from "react-redux";
import {TbCaptureFilled} from "react-icons/tb";
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import {db} from '../firebase';
import {nextImgNum} from "../store/imgNumSlice";
import {useParams} from "react-router-dom";
import {Session} from "openvidu-browser";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', // Modal의 너비를 50%로 설정
    height: '50%', // Modal의 높이를 50%로 설정
  }
};

const StyledButton = styled.button`
  width: 100px;
  height: 54px;
  align-self: center;
  font-weight: bolder;
  font-size: 20px;
  border: 2px dashed rgb(45, 45, 45);
  border-radius: 20px;
  background: rgba(255, 184, 36, 1);
  margin: 0 3rem 0 0;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 30%;
  left: 45%;
  width: 620px;
  height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid;
  background: linear-gradient(
          160deg,
          rgba(255, 252, 199, 1) 0%,
          rgba(255, 232, 102, 1) 100%
  );
`;

const ModalButton = styled.button`
  background: rgb(255, 184, 36);
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  height: 40px;
  width: 100px;
  margin-left: 16px;
  text-decoration-line: none;
  position: relative;

  &:hover {
    background-color: rgb(0, 164, 25)
  }
;
`;

Modal.setAppElement('#root');

export const ImgCaptureBtn = ({
                                setCapturedImages,
                                session,
                                capturedImages
                              }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState(null);

  const userInfo = useSelector((state) => state.user.value);
  const {meetingId} = useParams();

  const imgNum = useSelector((state) => state.imgNum.value)
  const dispatch = useDispatch();

  const addImageSignal = (imageUrl) => {
    session.signal({
      type:'addImage',
      data: JSON.stringify({ imageUrl })
    })
      .then(() => {console.log('캡쳐 이미지 저장 시그널')})
      .catch((err) => {console.log(err)})
  }

  const receviceAddImageSignal = (event) => {
    const {imageUrl} = JSON.parse(event.data);
    setCapturedImages(prevImages => [...prevImages, imageUrl]);  // URL 추가
  }


  useEffect(() => {
    if (session) {
      session.on('signal:addImage', receviceAddImageSignal);
    }

    return () => {
      if (session) {
        session.off('signal:addImage', receviceAddImageSignal);
      }

    }
  }, [session]);

  
  const captureScreen = () => {
    html2canvas(document.body).then((canvas) => {
      const data = canvas.toDataURL();
      setImgData(data);
      setIsOpen(true);
    });
  };

  const handleUploadImage = async () => {
    setIsOpen(false);
    dispatch(nextImgNum());

    // Create the file metadata
    const metadata = {
      contentType: 'image/png'
    };

    const storage = getStorage();
    const storageRef = strRef(storage, `meeting_image/${meetingId}/${userInfo.memberId}/${imgNum}`);
    const imageFile = dataURLtoFile(imgData, 'capture.png');
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on('state_changed',
      (snapshot) => {
        // Track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred
            break;
        }
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // downloadURL에 이미지 경로 들어옴

          addImageSignal(downloadURL)
          toastTest()
          // Update database with the download URL
          update(dbRef(db, `users/${meetingId}/${userInfo.memberId}/${imgNum}`), {image: downloadURL});
        });
      }
    );
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  const toastTest = () => {
    toast.success('사진이 저장되었습니다.', {
      position: "bottom-right"
    })
  }

  return (
    <div>
      <StyledButton onClick={captureScreen}> 캡쳐 <TbCaptureFilled/></StyledButton>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src={imgData} alt="screen capture" style={{width: '100%', height: 'auto'}}/>
          <div>
            <ModalButton onClick={handleUploadImage}> 사진저장</ModalButton>
            <ModalButton onClick={closeModal}>저장취소</ModalButton>
          </div>
        </div>
      </Modal>
      <ToastContainer
      />
    </div>
  );
};


ImgCaptureBtn.propTypes = {
  setCapturedImages: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default ImgCaptureBtn;