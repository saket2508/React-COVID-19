import React from 'react';
import {Bar, Line, Doughnut} from 'react-chartjs-3';

const PieChart = ({...chartData}) => {
    return(
        <div className='col-lg-6 col-sm-12 mb-3'>
                                    <div className='chart flex-fill'>
                                    <Doughnut
                                        data={chartData}
                                        options={{
                                            legend:{
                                                display:false,
                                                position:"bottom",
                                                labels:{
                                                    fontFamily:  "'Noto Sans JP', sans-serif",
                                                    fontColor:'#000'
                                                },
                                                onClick: (e) => e.stopPropagation()
                                            }
                                        }}
                                    />
                                    </div>
                                </div>
    )
}

export default PieChart