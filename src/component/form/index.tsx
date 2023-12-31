import { 
  ChangeEvent, 
  FormEvent, 
  useReducer, 
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

import { 
  Modal as Modals,
  Space,
  Spin
} from 'antd';
import { REDUCER_TYPE, reducer } from '../../state/reducer';
import initState from '../../state/state';

interface DataUser {
  name?: string;
  email?: string;
  date?:string;
  street?: string;
  city?: string;
  stateCode?: string;
  zipCode?: number;
  username?: string;
  password?: string;
}

interface Props {
  page?: number | undefined;
  setX:  Dispatch<SetStateAction<number>> | undefined;
}


const Form = ({page, setX}: Props) => {
  const [counter, setCounter] = useState<number>(0);
  const [list, setList] = useState<DataUser>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initState)

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setList(() => ({...list, [event.target.name]: event.target.value }));
  }

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: REDUCER_TYPE.SET_LOADING_TRUE})
    setTimeout(() => {
      dispatch({ type: REDUCER_TYPE.SET_LOADING_FALSE})
      setCounter(counter + 1);
      if(page !== undefined && setX !== undefined) {
        setX(page + 1)
      }
    }, 1000);
  }

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setCounter(counter - 1);
    if(page !== undefined && setX !== undefined) {
      setX(page - 1)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: REDUCER_TYPE.SET_LOADING_TRUE})
    setTimeout(() => {
      dispatch({ type: REDUCER_TYPE.SET_LOADING_FALSE})
      setModalOpen(true);
    }, 1000);
    
  }

  const handleOK = () => {
    setModalOpen(false);
    setList({})
    setCounter(0)
  }


  const handleCancel = () => {
    setModalOpen(false)
  }

  return (
    <>
      <form className="w-full max-w-sm" onSubmit={counter === 2 ? handleSubmit : handleNext}>
        {counter === 0 &&
          <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="name"
                  id="inline-full-name"
                  type="text"
                  value={list.name}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="email"
                  id="inline-email"
                  type="text"
                  value={list.email}
                  onChange={handleChangeValue} 
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-gender">
                  Date of Birth
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  name="date"
                  id="inline-date"
                  type="date"
                  value={list.date}
                  onChange={handleChangeValue} 
                  required
                />
              </div>
            </div>
          </>
        }

        { counter == 1 &&
          <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  Street Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="street" 
                  id="inline-street" 
                  type="text" 
                  value={list.street}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  City
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="city" 
                  id="inline-city" 
                  type="text" 
                  value={list.city}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  State
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="stateCode" 
                  id="inline-state" 
                  type="text" 
                  value={list.stateCode}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  Zip Code
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="zipCode" 
                  id="inline-zipcode" 
                  type="text" 
                  value={list.zipCode}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
          </>
        }

        { counter == 2 &&
          <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  Username
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="username" 
                  id="inline-username" 
                  type="text" 
                  value={list.username}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-zinc-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  name="password" 
                  id="inline-password" 
                  type="password" 
                  value={list.password}
                  onChange={handleChangeValue}
                  required
                />
              </div>
            </div>
          </>
        }
    
        <div className="md:flex md:items-center button-group">
          <div className="md:w-1/3"></div>
          <div className={ counter == 1 || counter == 2 ? 'md:w-2/3 button-1' : 'md:w-2/3'}>
            <button 
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-zinc-50 font-bold py-2 px-4 rounded" 
              type="submit"
            >
              {counter == 2 ? 'Submit' : 'Next'}
            </button>
          </div>

          { (counter == 1 || counter == 2 ) &&
            <>
              <div className="md:w-3/3 button-2">
                <button 
                  className="shadow bg-yellow-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-zinc-50 font-bold py-2 px-4 rounded" 
                  type="submit"
                  onClick={(event) => handlePrev(event)}
                >
                  Previous
                </button>
              </div>
            </>
          }
        </div>
    
      </form>
      <Modals
        open={modalOpen}
        title="Title"
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <p>Summary</p>
        <p>{list.name}</p>
        <p>{list.email}</p>
        <p>{list.date}</p>
        <p>{list.street}</p>
        <p>{list.city}</p>
        <p>{list.stateCode}</p>
        <p>{list.zipCode}</p>
        <p>{list.username}</p>
      </Modals>
      
      {state.loading === true &&
        <Space size="large">
          <Spin size="large" />
        </Space>
      }

    </>


  )
}

export default Form