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
      <div className="container mx-auto pt-6 pb-8 min-h-screen">
        {/* Main content with better spacing from borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-6 md:px-8 lg:px-12">
          {sessions?.map((data) => (
            <SummaryCard
              key={data?._id}
              colors="bg-white border border-black rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
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
              // Ensure delete button is visible on mobile
              showDeleteOnMobile={true}
            />
          ))}
        </div>

        {/* Floating Action Button with better positioning */}
        <button
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 
                     h-14 w-14 md:h-16 md:w-auto md:px-6 
                     flex items-center justify-center gap-3
                     bg-black text-white 
                     text-sm font-semibold rounded-full
                     shadow-lg hover:shadow-xl transition-all duration-300 
                     z-50 cursor-pointer
                     border-2 border-white"
          onClick={() => setOpenCreateModal(true)}
          aria-label="Add New Session"
        >
          <LuPlus className="text-xl md:text-2xl" />
          <span className="hidden md:inline">Add New</span>
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        className="bg-white text-gray-900 rounded-xl shadow-xl mx-4 md:mx-0 border border-black"
      >
        <div className="max-w-md mx-auto px-6 py-8">
          <CreateSessionForm />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
        className="bg-black text-white rounded-xl shadow-xl mx-4 md:mx-0"
      >
        <div className="max-w-sm mx-auto px-6 py-6">
          <DeleteAlertContent
            content="Are you sure you want to delete this session? This action cannot be undone."
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;