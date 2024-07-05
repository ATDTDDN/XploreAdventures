import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth';
import { setUser, clearUser } from '@/redux/slice/userLoggedSlice';

const Navbar = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogged.user);
    const [dropDownHidden, setDropDownHidden] = useState(true);

    useEffect(() => {
        getUserLogged();
    }, []);

    // Update global state (user) to ensure it's not null upon reload
    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        if (token) {
            userLog("user", (res) => dispatch(setUser(res)));
        }
    }
    // ===============================================================

    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    }

    const logout = async () => {
        await userLog("logout");
        dispatch(clearUser());
        router.push("/login_register");
    }

    const handleDropDownToggle = () => {
        setDropDownHidden(!dropDownHidden);
    };

    const linkList = {
        Home: "/",
        Destinations: "/destinations",
        Promo: "/promo",
        Login: "/login_register"
    }

    let modifiedLinkList = { ...linkList };

    if (user?.role === "admin") {
        if (currentPath.startsWith("/dashboard")) {
            modifiedLinkList = {};
        } else {
            delete modifiedLinkList.Login;
        }
    } else if (user) {
        delete modifiedLinkList.Login;
    }

    const keys = Object.keys(modifiedLinkList);

    return (
        <nav className={`${currentPath.startsWith('/dashboard') ? 'px-10' : 'px-36'} z-30 fixed flex items-center justify-between w-full h-16 mb-12 bg-white shadow-lg text-primaryblack font-poppins`}>
            <button onClick={() => currentPath.startsWith("/dashboard") ? () => () => router.push("dasboard/user") : router.push(linkList.Home)}><Image src="/images/Logo.png" width={130} height={80} /></button>
            <div className="flex items-center gap-16 text-sm font-medium">
                {keys.map((key, index) => (
                    <div key={index}>
                        <button
                            onClick={() => router.push(modifiedLinkList[key])}
                            className={`cursor-pointer hover:text-primaryred ${currentPath === modifiedLinkList[key] && currentPath === "/login_register" ? 'text-white bg-primaryred'
                                : (currentPath === modifiedLinkList[key] ? 'text-primaryred' : '')} ${key === "Login" ? "px-4 py-2 border hover:text-white hover:bg-primaryred rounded-lg border-primaryred" : ""}`}>
                            {key}
                        </button>
                    </div>
                ))}
                {user && (
                    <div className='flex relative text-[13px] w-full'>
                        <button onClick={handleDropDownToggle} className='flex items-center w-fit'>
                            <div className='rounded-lg h-10 w-10 overflow-hidden mr-3'>
                                <img src={user.profilePictureUrl} className='h-full w-full object-cover'></img>
                            </div>
                            <div className='text-left'>
                                <div className='flex items-center'>
                                    <h1 className='mr-2'>{getFirstName(user.name)}</h1>
                                    <i class={`${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'} fa-solid fa-caret-down`}></i>
                                </div>
                                <p className='text-[10px] leading-3 text-primarygray'>{user.role}</p>
                            </div>
                        </button>
                        <div className={`absolute right-0 w-36 z-10 mt-14 bg-white shadow-lg text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                            <div className="px-2">
                                <button
                                    className='flex items-center w-full justify-between px-4 py-1 my-2 rounded-md hover:bg-slate-200'>
                                    <h1>Profile</h1>
                                    <h1 className={`text-[10px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${user?.role === "admin" ? 'fa-user-plus' : 'fa-user'}`}></i></h1>
                                </button>
                                <button
                                    onClick={currentPath.startsWith("/dashboard") ? () => router.push("/") : () => router.push("dashboard/user")} className={`${user.role === "admin" ? '' : 'hidden'} flex items-center w-full justify-between px-4 py-1 my-2 rounded-md hover:bg-slate-200`}>
                                    <h1>{currentPath.startsWith("/dashboard") ? "Preview" : "Dashboard"}</h1>
                                    <h1 className={`text-[10px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${currentPath.startsWith("/dashboard") ? 'fa-globe' : 'fa-table-columns'}`}></i></h1>
                                </button>
                                <button
                                    onClick={logout} className='flex items-center w-full justify-between px-4 py-1 my-2 rounded-md hover:bg-slate-200'>
                                    <h1>Logout</h1>
                                    <h1 className={`text-[10px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class="fa-solid fa-right-from-bracket"></i></h1>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav >
    )
}

export default Navbar
