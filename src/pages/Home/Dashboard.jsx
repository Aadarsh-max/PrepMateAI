import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data: ", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data: ", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

return (
  <DashboardLayout>
    <div className="container mx-auto pt-4 pb-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        {sessions?.map((data) => (
          <SummaryCard
            key={data?._id}
            colors="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            role={data?.role || ""}
            topicsToFocus={data?.topicsToFocus || ""}
            experience={data?.experience || "-"}
            questions={data?.questions?.length || "-"}
            description={data?.description || ""}
            lastUpdated={
              data?.updatedAt
                ? moment(data.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/interview-prep/${data?._id}`)}
            onDelete={() => setOpenDeleteAlert({ open: true, data })}
          />
        ))}
      </div>

      <button
        className="fixed bottom-10 md:bottom-20 right-10 md:right-20 h-12 md:h-12 flex items-center justify-center gap-3
                   bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full
                   shadow-md hover:bg-gray-800 transition duration-300 cursor-pointer"
        onClick={() => setOpenCreateModal(true)}
        aria-label="Add New Session"
      >
        <LuPlus className="text-2xl" />
        Add New
      </button>
    </div>

    <Modal
      isOpen={openCreateModal}
      onClose={() => setOpenCreateModal(false)}
      hideHeader
      className="bg-white text-gray-900 rounded-xl shadow-md"
    >
      <div className="max-w-md mx-auto px-4 py-6">
        <CreateSessionForm />
      </div>
    </Modal>

    <Modal
      isOpen={openDeleteAlert?.open}
      onClose={() => setOpenDeleteAlert({ open: false, data: null })}
      title="Delete Alert"
      className="bg-white text-gray-900 rounded-xl shadow-md"
    >
      <div className="max-w-sm mx-auto px-4 py-6">
        <DeleteAlertContent
          content="Are you sure you want to delete this session detail?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </div>
    </Modal>
  </DashboardLayout>
);

};

export default Dashboard;
