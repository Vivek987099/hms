import React from "react";

const Contact = () => {
  return (
    <>
      <div className="contact min-h-screen flex justify-end">
        <div className=" w-1/2 flex justify-center items-start">
          <div className="bg-[rgba(1,1,1,0.3)] w-full text-white m-5 outline p-2 outline-red-600 rounded-2xl">
            <h1 className="text-center  text-3xl font-semibold">
              Contact Form
            </h1>
            <form className="p-5">
              <div className="mt-1.5">
                <label htmlFor="name">Name : </label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter name "
                  className="bg-white outline-1 focus:outline-red-500 mt-0.5 placeholder:text-black w-full px-1"
                />
              </div>

              <div className="mt-1.5">
                <label htmlFor="email">email : </label>
                <input
                  type="email"
                  name=""
                  id="email"
                  placeholder="Enter email "
                  className="bg-white outline-1 focus:outline-red-500 mt-0.5 placeholder:text-black w-full px-1"
                />
              </div>

              <div className="mt-1.5">
                <label htmlFor="mobile">Mobile : </label>
                <input
                  type="number"
                  name=""
                  id="mobile"
                  placeholder="Enter phone "
                  className="bg-white outline-1 focus:outline-red-500 mt-0.5 placeholder:text-black w-full px-1"
                />
              </div>
              <div className="mt-1.5">
                <label htmlFor="">Message : </label>
                <textarea
                  name=""
                  id=""
                  placeholder="Message..."
                  className="bg-white outline-1 focus:outline-red-500 mt-0.5 placeholder:text-black w-full px-1"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
 
      </div>
       <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.7870508368356!2d78.42051177854972!3d27.16182759077067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397447d3ec0d41cb%3A0xb3dd0274c1829cbe!2sML%20khare%20kirana%20stor!5e1!3m2!1sen!2sin!4v1770392236728!5m2!1sen!2sin"
          width="100%"
          height="350"
         
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
            
    </>
  );
};

export default Contact;
