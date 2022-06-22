import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Invoice() {
  const { state } = useLocation();
  // const { value } = state;
  // console.log("haib is my name ", state);

  // console.log("invoice value", state);
  const [data, setData] = useState({});
  const [effect, setEffect] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = useSelector((state) => state);
  if (obj) {
    // var set = obj.users.editObj.invoice_status
  } else {
    var set = "";
  }
  const deleteInvoice = () => {
    dispatch({ type: "DELETE_ALERT", payload: { show: true, id: state._id } });
  };
  const editInvoice = (fireData) => {
    // console.log(fireData);
    navigate("", { state: fireData });
    dispatch({
      type: "EDIT_INVOICE",
      payload: { drawer: true, obj: data, id: state._id },
    });
  };

  var initialValues = {
    invoiceNumber: data.invoiceNumber,
    bill_from_street_address: data.bill_from_street_address,
    bill_from_city: data.bill_from_city,
    bill_from_post_code: data.bill_from_post_code,
    bill_from_country: data.bill_from_country,
    bill_to_client_name: data.bill_to_client_name,
    bill_to_client_email: data.bill_to_client_email,
    bill_to_client_address: data.bill_to_client_address,
    bill_to_client_city: data.bill_to_client_city,
    bill_to_client_post_code: data.bill_to_client_post_code,
    bill_to_client_country: data.bill_to_client_country,
    bill_to_client_invoice_date: data.bill_to_client_invoice_date,
    bill_to_client_payment_terms: data.bill_to_client_payment_terms,
    bill_to_client_project_description: data.bill_to_client_project_description,
    invoice_status: "Paid",
    items: data.items,
  };

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/invoice/get/" + state._id)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  //   // setPaid()
  // }, [effect, initialValues]);

  const setPaid = async () => {
    const response = await fetch(
      `http://localhost:4000/invoice/update/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialValues),
      }
    );
    // dispatch({type:"EDIT_INVOICE",payload:{drawer:true,obj:values}})
    // navigate(`/invoice/view/${data.invoiceNumber}`);
    return console.log(response);
  };
  if (state.items) {
    var sum = state.items.reduce((accumulator, object) => {
      return accumulator + object.qty * object.price;
    }, 0);
  }

  return (
    <>
      <div className="flex flex-row bg-[#141625] min-h-screen justify-center  ">
        <div className=" mt-20 max-w-5xl w-full ">
          <div className="mx-10">
            <Link to="/">
              <p className="text-white px-3 py-1 mb-4 cursor-pointer hover:text-[#7c5dfa] transition border inline-block  rounded-full">
                Go Back
              </p>
            </Link>
            <div className=" w-full flex flex-col items-center  md:flex-row space-y-5 md:space-y-0 justify-between mb-8 bg-[#1e2139] p-5 rounded-md">
              <div className=" flex items-center space-x-4 ">
                <span className="text-white  ">Status</span>
                <p className="bg-green-300/[.06]   rounded-md px-3 py-1 text-[#58cfb6]">
                  {state.invoice_status}
                </p>
              </div>
              <div className="text-white md:flex  space-x-0 space-y-3 md:space-y-0 md:space-x-2">
                <div
                  onClick={() => editInvoice(state)}
                  className="px-5 py-1 border border-green-400 rounded-full font-bold transition hover:bg-green-400 hover:border-white  hover:scale-105 cursor-pointer"
                >
                  Edit
                </div>
                <div
                  onClick={() => deleteInvoice()}
                  className="px-5 py-1 border border-red-400 rounded-full font-bold transition hover:bg-red-400 hover:border-white  hover:scale-105 cursor-pointer"
                >
                  Delete
                </div>
                {data.invoice_status == "Paid" ? null : (
                  <div
                    onClick={() => setPaid()}
                    className="px-5 py-1 border border-purple-400 rounded-full font-bold transition hover:bg-purple-400 hover:border-white  hover:scale-105 cursor-pointer"
                  >
                    Mark as Paid
                  </div>
                )}
              </div>
            </div>
            <div className="mb-8 bg-[#1e2139] p-5 rounded-md">
              <div className="flex flex-row justify-between ">
                <div className=" h-32">
                  <p className="text-white text-lg">
                    <span className="font-bold text-[#7e88c3]"> # </span>
                    <span className=" font-bold text-blue-600">
                      {state.invoiceNumber}
                    </span>
                  </p>
                  <p className="text-white">
                    <span>{state.bill_to_client_project_description}</span>
                  </p>
                </div>
                <div className="text-white text-[12px] text-right">
                  <p className="text-lg font-bold text-blue-600">Total Bill</p>
                  <p className="text-lg font-bold text-blue-600 ">
                    $ <span className="text-white font-bold">{sum}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-content-center space-y-5 md:space-y-0   md:space-x-5 bg-[#1e2139] p-5 rounded-md">
                <div className="  text-[12px] ">
                  <p className=" font-bold text-blue-600">Invoice Date</p>
                  <p className="text-white text-[15px] font-bold">
                    {new Date(state.bill_to_client_invoice_date.seconds * 1000)
                      .toLocaleDateString()
                      .slice(0, 10)}
                  </p>
                  <br />
                  <br />
                  <p className=" font-bold text-blue-600">Payment Due</p>
                  <p className="text-white text-[15px] font-bold">
                    {state.bill_to_client_invoice_date.seconds
                      ? new Date(
                          state.bill_to_client_invoice_date.seconds * 1000
                        )
                          .toLocaleDateString()
                          .slice(0, 10)
                      : null}
                  </p>
                </div>
                <div className="  text-[12px] grid grid-cols-2 gap-3 col-span-2 ">
                  <div>
                    <p className=" font-bold text-blue-600">Bill To</p>
                    <p className="text-white text-[15px] font-bold">
                      {state.bill_to_client_name}
                    </p>
                  </div>
                  <div>
                    <p className=" text-[12px] font-bold  text-blue-600">
                      Address
                    </p>
                    <p className="text-white">{state.bill_to_client_address}</p>
                  </div>
                  <div>
                    <p className=" text-[12px] font-bold mt-3 text-blue-600">
                      City
                    </p>
                    <p className="text-white">{state.bill_to_client_city}</p>
                  </div>
                  <div>
                    <p className=" text-[12px] font-bold mt-3 text-blue-600">
                      PostCode
                    </p>
                    <p className="text-white">
                      {state.bill_to_client_post_code}
                    </p>
                  </div>
                  <div>
                    <p className=" text-[12px] font-bold mt-3 text-blue-600">
                      Countery
                    </p>
                    <p className="text-white">{state.bill_to_client_country}</p>
                  </div>
                </div>
                <div className=" text-[12px] ">
                  <p className=" font-bold text-blue-600">Send to</p>
                  <p className="text-white text-[15px] font-bold break-words">
                    {state.bill_to_client_email}
                  </p>
                </div>
              </div>

              <div className="bg-[#252945] px-3 rounded-md">
                <div className=" w-full  text-[12px] flex flex-row justify-between">
                  <p className=" mt-3 text-blue-600 font-bold uppercase">
                    Item Name
                  </p>
                  <div className="flex flex-row">
                    <p className=" mt-3 text-blue-600 font-bold uppercase">
                      QTY.
                    </p>
                    <p className=" mt-3 px-8 text-blue-600 font-bold uppercase">
                      Price
                    </p>
                    <p className="mt-3 ml-8  text-right text-blue-600 font-bold uppercase">
                      Total
                    </p>
                  </div>
                </div>

                {state.items
                  ? state.items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className=" w-full mb-2 text-[12px] flex flex-row justify-between"
                        >
                          <p className="text-white mt-3">{item.itemName}</p>
                          <div className="flex flex-row">
                            <p className="text-white mt-3">{item.qty}</p>
                            <p className="text-white mt-3 px-8">{item.price}</p>
                            <p className="text-white mt-3 ml-8  text-right">
                              {item.qty * item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : null}

                <div className=" text-[12px] flex flex-row"></div>
              </div>
              <div className="bg-[#000000] flex flex-row mt-5 p-3 rounded-md">
                <div className=" w-full flex flex-row justify-between">
                  <p className="text-white   text-xl">Account Due</p>
                  <p className="text-white  text-right text-2xl">$ {sum}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
