import { useEffect, useState } from "react";

import ModalCart from "../../Components/CartModal";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Main from "../../Components/Main";

export interface IModal {
  modalAnimation?: any;
  setModalAnimation: (show: number) => void;
}
const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAnimation, setModalAnimation] = useState<number>(0);

  useEffect(() => {
    showModal === true
      ? setTimeout(() => {
          modalAnimation ? setShowModal(true) : setShowModal(false);
        }, 450)
      : modalAnimation ? setShowModal(true) : setShowModal(false);
  }, [modalAnimation]);

  return (
    <>
      <Header
        setModalAnimation={setModalAnimation}
        modalAnimation={modalAnimation}
      />
      {showModal && (
        <ModalCart
          setModalAnimation={setModalAnimation}
          modalAnimation={modalAnimation}
        />
      )}
      <Main />
      <Footer />
    </>
  );
};

export default Dashboard;
