import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openSidebar() {
        setIsSidebarOpen(true);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    function openModal() {
        setIsModalOpen(true);

    }
    function closeModal() {
        setIsModalOpen(false);
    }

    return <AppContext.Provider value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar
    }}>
        {children}
    </AppContext.Provider>
}

// custom hook -> needs to start name with use
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }
