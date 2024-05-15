const populate = async (value, currency) => {
    let myStr = "";
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_mzbfxy592DaPopfsrmX7M9inEYGwCwuEgenUv3KC&base_currency=${currency}`;
    try {
      let response = await fetch(url);
      let rJson = await response.json();
      document.querySelector(".output").style.display = "block";
  
      for (let key of Object.keys(rJson["data"])) {
        myStr += `<tr>
                    <td>${key}</td>
                    <td>${rJson["data"][key]["code"]}</td>
                    <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
                  </tr>`;
      }
      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = myStr;
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };
  
  const btn = document.querySelector(".btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    if (!isNaN(value) && value > 0) {
      populate(value, currency);
    } else {
      alert("Please enter a valid quantity");
    }
  });
  