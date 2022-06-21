import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

const GraphLastMonth = ({ data }) => {
  const [reportByMonth, setReportByMonth] = useState(null);

  let [options, setOptions] = useState({});
  let [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchDataByMonth = async () => {
      if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))

        const headers = {
          'Authorization': "Bearer " + obj.access_token,
        };

        const response = await fetch('http://asabeta.com/api/main-dashboard/count-last-5-month', { headers });
        const data = await response.json();
        setReportByMonth(data);

        setOptions(
          {
            colors: ['#ccc', '#7a6fbe', '#28FFe3', '#FFbfe3'],
            chart: {
              toolbar: {
                show: !1,
              },
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              curve: 'smooth',
              width: 0.1,
            },
            grid: {
              borderColor: '#f8f8fa',
              row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: [
                data[0].data[4].bulan + "/" + data[0].data[4].tahun,
                data[0].data[3].bulan + "/" + data[0].data[3].tahun,
                data[0].data[2].bulan + "/" + data[0].data[2].tahun,
                data[0].data[1].bulan + "/" + data[0].data[1].tahun,
                data[0].data[0].bulan + "/" + data[0].data[0].tahun
              ],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              }
            },
            legend: {
              show: !1
            },
          }
        )

        setSeries(
          [
            {
              name: data[0].aduan,
              data: [
                data[0].data[4].total,
                data[0].data[3].total,
                data[0].data[2].total,
                data[0].data[1].total,
                data[0].data[0].total
              ]
            },
            {
              name: data[1].aduan,
              data: [
                data[1].data[4].total,
                data[1].data[3].total,
                data[1].data[2].total,
                data[1].data[1].total,
                data[1].data[0].total
              ]
            },
            {
              name: data[2].aduan,
              data: [
                data[2].data[4].total,
                data[2].data[3].total,
                data[2].data[2].total,
                data[2].data[1].total,
                data[2].data[0].total
              ]
            },
            {
              name: data[3].aduan,
              data: [
                data[3].data[4].total,
                data[3].data[3].total,
                data[3].data[2].total,
                data[3].data[1].total,
                data[3].data[0].total
              ]
            }
          ],
        )
      }
    }

    fetchDataByMonth()
      .catch(console.error);
  }, []);


  return (
    <React.Fragment>
      <Card>
        {reportByMonth && <CardBody>
          <h4 className="card-title mb-4">Complaint Recapitulation This Month</h4>

          <Row className="text-center mt-4">
            <Col xs="3">
              <h5 className="font-size-20">{reportByMonth[0].data[0].total}</h5>
              <p className="text-muted">{reportByMonth[0].aduan}</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{reportByMonth[1].data[0].total}</h5>
              <p className="text-muted">{reportByMonth[1].aduan}</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{reportByMonth[2].data[0].total}</h5>
              <p className="text-muted">{reportByMonth[2].aduan}</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{reportByMonth[3].data[0].total}</h5>
              <p className="text-muted">{reportByMonth[3].aduan}</p>
            </Col>
          </Row>

          <div id="morris-area-example" className="morris-charts morris-charts-height" dir="ltr">
            <ReactApexChart options={options} series={series} type="area" height="300" />
          </div>
        </CardBody>
        }
      </Card>
    </React.Fragment>
  );
}

export default GraphLastMonth