
const Fee = () => {

  const fees = [
    { range: '1 ETH or below', rate: '5%' },
    { range: '1 to 5 ETH', rate: '3%' },
    { range: '5 to 10 ETH', rate: '2.5%' },
    { range: '10 to 50 ETH', rate: '2%' },
    { range: '50+ ETH', rate: '1.5%' },
  ];



  return (
    <div style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }} className="credit-card w-full lg:w-[32rem] sm:w-[26rem] border-opacity-5 mx-auto rounded-3xl">
      <div className="max-w-lg m-6 mx-14 p-4 b shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Fee Structure</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-600 text-left ">Range</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Rate</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={index} >
                <td className="py-2 px-4 border-b border-gray-800">{fee.range}</td>
                <td className="py-2 px-4 border-b border-gray-800">{fee.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fee;
