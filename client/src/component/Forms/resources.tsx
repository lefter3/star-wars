import { useEffect, useState } from "react";

function ResourcesForm(props: any) {
  
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [change, setChange] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  let handleSubmit = async (e: any, set: boolean) => {
    e.preventDefault();
    // if (change * -1 > quantity && !set) {
    //     setMessage("Cannot update with current quantity")
    //     return
    // }
    var body: any = {};
    var url = "http://localhost:3000/" + props.type 
    if (set) body = { count }
    else {
        body = { change }
        url+="/update"
    }
    url += `/${props.id}`
    try {
        let res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        console.log(res)
        setMessage("")
        let resJson = await res.json();
        console.log(resJson)
        if (res.status === 200) {
            setCount(0);
            setChange(0)
            setQuantity(resJson.count);
            setLoading(false);
        }
        else {
        setMessage(resJson.message || res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let getQuantity =async () => {
    var url = `http://localhost:3000/${props.type}/${props.id}`
    try {
        let res = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
            },
        });
        let resJson = await res.json();
        if (res.status === 200) {
            
          if (resJson) setQuantity(resJson);
          setLoading(false)
        } else {

        setQuantity(0)
        setLoading(false)

        }
      } catch (err) {
        console.log(err);
      }
  }

  useEffect(() => {
    getQuantity()
  }, []);

  return (
    <div className="form-wrapper">
        <div className="details">
            <div className="details__label">
                Quantity :
            </div>
            <div className="details__value">{ !loading ? quantity : "Loading..." }</div><br/>
        </div>
        <div className="form">
            <div className="row">
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </div>

            <div className="row">

                <div className="col">
                    <form onSubmit={e => handleSubmit(e, true)}>
                        <input
                        type="number"
                        min="0"
                        value={count}
                        placeholder="Count"
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        />
                        <button type="submit" value={props.type}>Set Quantity</button>
                    </form>
                </div>
                <div className="col">

                    <form onSubmit={e => handleSubmit(e, false)}>
                        <input
                        type="number"
                        value={change}
                        placeholder="Change"
                        onChange={(e) => setChange(parseInt(e.target.value))}
                        />

                        <button type="submit" value={props.type}>Adjust Quantity</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ResourcesForm;
