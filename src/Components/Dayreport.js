import React, { useState } from 'react'

export default React.memo(function Dayreport(props) {
  return (
    <>
      {
        [...props.data.keys()].map((k) => {
          return (
            <>
              {k.localeCompare(`${props.today}`) != 0 &&
                <>
                  <div className="nexttemps">
                    <h1>{JSON.stringify((props.data.get(k).dt_txt)).substring(1, 11)}</h1>
                    <h1>{JSON.stringify(props.data.get(k).main.temp)}<sup>o</sup>C</h1>
                    <img src={`https://openweathermap.org/img/wn/${props.data.get(k).weather[0].icon}@2x.png`} alt="" />
                    <h1>{props.data.get(k).weather[0].main}</h1>
                  </div>
                </>
              }
            </>

          );
        })
      }
    </>
  )
}
)