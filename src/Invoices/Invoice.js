import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../Components/Filter";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { StatusOnlineIcon } from "@heroicons/react/solid";
import moment from "moment";
export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = useSelector((state) => state.users.invoiceStatus);
  const reducerInvoices = useSelector((state) => state.users.invoices);
  const invoiceStatus = useSelector((state) => state.users.status);
  const singleInvoice = useSelector((state) => state.users.invoiceObj);

  var customInvoices = invoices;
  // console.log(status);
  useEffect(() => {
    const result = getDocs(collection(db, "Invoices")).then((res) => {
      setStatus(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      const data = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispatch({ type: "SET_INVOICE", payload: { invoices: data } });

      // console.log("habib => ", status);
    });
  }, [invoiceStatus]);

  const addInvoice = (value) => {
    dispatch({ type: "LOG_OUT", payload: { drawer: true, obj: {} } });
  };

  const ShowInvoice = (value) => {
    // console.log(value);
    dispatch({
      type: "SINGLE_INVOICE",
      payload: { obj: value, refresh: true },
    });
    navigate(`/invoice/view/${value.invoiceNumber}`);
  };

  useEffect(() => {
    if (obj === "All") {
      setStatus(invoices);
    } else if (obj === "Pending") {
      var customInvoices = invoices.filter((invoice) => {
        return invoice.invoice_status === "Pending";
      });
      setStatus(customInvoices);
    } else if (obj === "Paid") {
      var customInvoices = invoices.filter((invoice) => {
        return invoice.invoice_status === "Paid";
      });
      setStatus(customInvoices);
    }
  }, [status]);
  // split value
  const date = new Date(1655751600 * 1000).toString();
  // console.log("habib", date.slice(0, 10));
  return (
    <>
      <div className="flex flex-row bg-[#141625] justify-center  min-h-screen w-full">
        <div className="w-full max-w-5xl mt-20">
          <div className="flex flex-row justify-between mb-8">
            <div>
              <span className="text-white text-2xl font-bold">Invoices</span>
              <br />
              <span className="text-white text-md">
                There are total {status.length} Invoices
              </span>
            </div>

            <div className="flex flex-row ">
              <div className="mr-8 mt-2">
                <Filter />
              </div>
              <div
                onClick={() => addInvoice()}
                className=" cursor-pointer flex justify-center items-center bg-[#7c5cfb] px-2 py-2 text-white rounded-[14%] md:rounded-full	"
              >
                <span className="  bg-white rounded-[14%] md:rounded-full  w-7 h-7 mr-2 pl-2 text-gray-600 font-bold ">
                  {" "}
                  +{" "}
                </span>
                New <span className=" block"> Invoice</span>
              </div>
            </div>
          </div>
          {reducerInvoices.map((value, index) => (
            <div
              onClick={() => ShowInvoice(value)}
              key={index}
              className=" hover:scale-105 transition duration-400  w-full bg-[#1f213a] p-5 rounded-md md:flex md:flex-row justify-between items-center mb-2.5 cursor-pointer  border border-transparent  hover:border-[#fff]"
            >
              <p className="text-[#6b6c9a]">
                #<span className="text-white">{value.invoiceNumber}</span>
              </p>
              <p className="text-[#6b6c9a]">
                {new Date(value.bill_to_client_invoice_date.seconds * 1000)
                  .toLocaleDateString()
                  .slice(0, 10)}
              </p>
              <p className="text-[#6b6c9a]">{value.bill_to_client_name}</p>
              <p className="text-white">
                £{value.items[0].qty * value.items[0].price}
              </p>
              {value.invoice_status === "Paid" ? (
                <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#58cfb6]">
                  ● {value.invoice_status}
                </p>
              ) : (
                <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#ff8c2e]">
                  ● {value.invoice_status}
                </p>
              )}
            </div>
          ))}

          {invoices.map((value, index) => (
            <div
              onClick={() => ShowInvoice(value)}
              key={index}
              className="w-full bg-[#1f213a] p-5 rounded-md md:hidden justify-between items-center mb-2.5 cursor-pointer  border border-transparent transition hover:border-[#fff]"
            >
              <div className="flex flex-row justify-between">
                <p className="text-[#6b6c9a]">
                  #<span className="text-white">{value.invoiceNumber}</span>
                </p>
                <p className="text-[#6b6c9a]">{value.bill_to_client_name}</p>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-[#6b6c9a]">
                    {/* {value.bill_to_client_invoice_date.slice(0, 10)} */}
                  </p>
                  <p className="text-white">
                    £{value.items[0].qty * value.items[0].price}
                  </p>
                </div>
                {value.invoice_status === "Paid" ? (
                  <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#58cfb6]">
                    ● {value.invoice_status}
                  </p>
                ) : (
                  <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#ff8c2e]">
                    ● {value.invoice_status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <AddInvoice /> */}
    </>
  );
}
