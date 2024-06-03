import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import Wrapper from '../components/UI/Wrapper';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { CiCirclePlus } from 'react-icons/ci';
import AddResModal from '../components/AddResModal';
import axios from 'axios';
import { baseUrl } from '../config';
import Loader from '../components/UI/Loader';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
  const [isAddResModalVisible, setIsAddResModalVisible] = useState(false);
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (user.role === 'owner') {
      axios
        .get(`${baseUrl}/restaurants/${user.id}`)
        .then((res) => {
          console.log(res.data);
          setRes(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    setIsLoading(false);
  }, []);

  return (
    <Wrapper>
     {
     isLoading
     ? <Loader/>
     :  <>
      <div className='w-full flex gap-3 flex-wrap'>
        <div className='mt-[40px] shadow-2xl min-h-[250px] py-3 px-5 rounded-xl w-full max-w-[300px]'>
          <h1 className='font-bold text-2xl mb-4'>Profile</h1>
          <div className='flex items-center gap-3'>
            <IconContext.Provider
              value={{ style: { width: '60px', height: '60px' } }}
            >
              <div>
                <FaUserCircle />
              </div>
            </IconContext.Provider>
            <div className='text-2xl'>{user.name}</div>
          </div>
          <div className='mt-3'>
            <p className='text-lg font-medium'>Email: {user.email}</p>
            <p className='text-lg font-medium'>Role: {user.role}</p>
          </div>
        </div>
        <div className='mt-[40px] shadow-2xl py-3 min-h-[250px] px-5 rounded-xl w-full max-w-[300px]'>
          <h1 className='font-bold text-2xl mb-4'>Orders</h1>
          <div>
            {user.orders === undefined || user.orders.length === 0 ? (
              <p className='text-center mt-[90px] text-gray-500 text-xl font-medium'>
                You have no orders yet
              </p>
            ) : (
              user.orders.map((order) => <div>{order.restaurant}</div>)
            )}
          </div>
        </div>
        {user.role === 'owner' ? (
          <div className='mt-[40px] shadow-2xl py-3 min-h-[250px] px-5 rounded-xl w-full max-w-[300px]'>
            <h1 className='font-bold text-2xl'>Your restaurant</h1>
            <div className='flex justify-center mt-[20px]'>
              {res === null ? (
                <button
                  onClick={() => setIsAddResModalVisible(true)}
                  className='text-center mt-[70px] flex justify-center hover:translate-y-[-10px] duration-300 shadow-2xl bg-gray-300 text-white py-3 px-5 rounded-xl text-xl font-medium'
                >
                  <IconContext.Provider
                    value={{ style: { width: '60px', height: '60px' } }}
                  >
                    <div>
                      <CiCirclePlus />
                    </div>
                  </IconContext.Provider>
                </button>
              ) : (
                <Link to='/my_restaurant' className='flex flex-col items-center'>
                  <h2 className='font-medium text-2xl mb-3'>{res.name}</h2>
                  <img className="w-[100px] h-[100px]" src={res.image} alt="" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {isAddResModalVisible ? (
        <AddResModal
          isVisible={isAddResModalVisible}
          setIsVisible={setIsAddResModalVisible}
        />
      ) : (
        ''
      )}</>
     }
    </Wrapper>
  );
};

export default Profile;