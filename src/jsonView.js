import React, { useEffect, useState } from "react";
import axios from "axios";

const JsonView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://api.npoint.io/93bed93a99df4c91044e").then((res) => {
      var jsonData = res.data.body.Recommendations;
      let ans = [];
      jsonData.forEach((element) => {
        let child1 = [];
        var menuList = element.menu;
        menuList.forEach((item) => {
          if (item.type == "sectionheader") {
            var childList2 = item.children;
            childList2.forEach((item1) => {
              if (item1.type === "item" && item1.selected === 1) {
                rec(item1, child1);
              }
            });
          }
        });
        ans[element.RestaurantName] = child1;
      });
      setData(ans);
    });
  }, []);
  console.log(data);
  return (
    data &&
    Object.keys(data).map((res) => {
      return (
        <>
          <h3 style={{ alignItem: "left" }}>{res}</h3>
          {Object.keys(data[res]).map((itr) => {
            return (
              <>
                <h4 style={{ marginLeft: "40px" }}>->{itr}</h4>
                {Object.keys(data[res][itr]).map((subItr) => {
                  return (
                    <>
                      <p style={{ marginLeft: "110px" }}>->{subItr}</p>
                    </>
                  );
                })}
              </>
            );
          })}
        </>
      );
    })
  );
};

function rec(p, c) {
  var child = [];
  var childList = p.children;
  childList.forEach((item) => {
    if (item.selected === 1) {
      rec(item, child);
    }
  });
  c[p.name] = child;
}

export default JsonView;
