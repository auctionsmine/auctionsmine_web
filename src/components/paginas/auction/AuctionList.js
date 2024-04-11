import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import AuctionApi from "../../api/AuctionApi";
import StateApi from "../../api/StateApi";
import { BsSearch  } from "react-icons/bs";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function AuctionList(){

    const [auctionList, setAuctionList] = useState([]);
    const [stateList, setStateList] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [startDateStr, setStartDateStr] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endDateStr, setEndDateStr] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [statusActive, setStatusActive] = useState(true);
    const [statusPosponed, setStatusPosponed] = useState(true);
    const [statusCancel, setStatusCancel] = useState(true);

    const location = useLocation();

    const auctionApi = new AuctionApi();
    const stateApi = new StateApi();

    function changeStatus(event){
        event.preventDefault();

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        console.log('changeStatus: ' + id + ' - ' + value);
        if (id === 'checkActive'){
            setStatusActive(value);
            consultarEPrecherTableFilter(value, statusPosponed, statusCancel);
        }else if (id === 'checkPosponed'){
            setStatusPosponed(value);
            consultarEPrecherTableFilter(statusActive, value, statusCancel);
        }else if (id === 'checkCancel'){
            setStatusCancel(value);
            consultarEPrecherTableFilter(statusActive, statusPosponed, value);
        }
    }

    function formatDateToStr(date){
        if (date){
            var d = new Date(date),
                month = '' + (d.getMonth() +1),
                day = '' + d.getDate(),
                year = '' + d.getFullYear();

            if (d.getMonth() < 10) month = '0' + month;
            if (d.getDate() < 10) day = '0' + day;

            return month + '/' + day + '/' + year;
        }else{
            return '';
        }
    }

    function changeStartDate(date){
        setStartDate(date);
        var dateStr = formatDateToStr(date);
        setStartDateStr(dateStr);
    }

    function changeEndDate(date){
        setEndDate(date);
        var dateStr = formatDateToStr(date);
        setEndDateStr(dateStr);
    }

    function submitSearchForm(e) {
        e.preventDefault();
        consultarEPrecherTableFilter(statusActive, statusCancel);
    }

    useEffect(() => {
        consultarStates();
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarStates(){
        stateApi.getAllStates(setStateList);
    }

    function consultarEPrecherTable(){
        auctionApi.getAllAuctions(setAuctionList);
    }

    function consultarEPrecherTableFilter(statusA, statusP, statusC){
        var actionFilter = {};
        actionFilter.startDate = startDateStr;
        actionFilter.endDate = endDateStr;
        actionFilter.address = address;
        actionFilter.city = city;
        actionFilter.state = state;
        actionFilter.statusList = [];
        if (statusA){
            actionFilter.statusList.push('A');
            actionFilter.statusList.push('F');
        }
        if (statusP){
            actionFilter.statusList.push('P');
        }
        if (statusC){
            actionFilter.statusList.push('C');
        }
        console.log(actionFilter);

        auctionApi.getByFilter(setAuctionList, actionFilter);
    }

    return(
        <>
            <br/>
            <Container>
                <Form  id="searchForm" onSubmit={submitSearchForm}>
                    <Row xs="auto" className="justify-content-md-center">
                        <Col xl={3}>
                            <DatePicker
                                className="form-control form-control-sm"
                                showIcon
                                selected={startDate}
                                onChange={(date) => changeStartDate(date)}
                                isClearable
                                placeholderText="Start Date"
                                form="searchForm"
                                dateFormat="MM/dd/yyyy"
                            />
                        </Col>
                        <Col xl={3}>
                            <DatePicker
                                className="form-control form-control-sm"
                                showIcon
                                selected={endDate}
                                onChange={(date) => changeEndDate(date)}
                                isClearable
                                placeholderText="End Date"
                                form="searchForm"
                                dateFormat="MM/dd/yyyy"
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row xs="auto" className="justify-content-md-center">
                        <Col xl={3}>
                            <Form.Group className="mb-3" controlId="searchAddress">
                                <Form.Control type="text" size="sm" value={address} placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col xl={3}>
                            <Form.Group className="mb-3" controlId="searchCity">
                                <Form.Control type="text" size="sm" value={city} placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col xl={1}>
                            <Form.Group className="mb-3" controlId="searchState">
                                <Form.Select aria-label="State" size="sm" onChange={(e)=>setState(e.target.value)}>
                                    <option value="">State</option>
                                    {
                                        stateList.map((item, index) => (
                                            <option key={index} value={`${item.code}`}>{item.code} - {item.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xl={1}>
                            <Button size="sm" variant="primary" type="submit">
                                <BsSearch/>
                            </Button>
                        </Col>
                    </Row>

                    <Row xs="auto" className="justify-content-md-center">
                        <Col>
                            <div className="mb-3 justify-content-md-center">
                                <Form.Check
                                    checked={statusActive}
                                    id="checkActive"
                                    inline
                                    className="form-select-sm fw-bold text-success"
                                    type="checkbox"
                                    label="Active"
                                    onClick={changeStatus}
                                />
                                <Form.Check
                                    checked={statusPosponed}
                                    id="checkPosponed"
                                    inline
                                    className="form-select-sm fw-bold text-warning"
                                    type="checkbox"
                                    label="Posponed"
                                    onClick={changeStatus}
                                />
                                <Form.Check
                                    checked={statusCancel}
                                    id="checkCancel"
                                    inline
                                    className="form-select-sm fw-bold text-danger"
                                    type="checkbox"
                                    label="Cancelled"
                                    onClick={changeStatus}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <br/>
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th align="center">Date</th>
                        <th align="center">Time</th>
                        <th align="center">Status</th>
                        <th align="left">Address</th>
                        <th align="left">City</th>
                        <th align="center">State</th>
                        <th align="right">Deposit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        auctionList.map((item, index) => (
                            <tr key={index}>
                                <td align="center" valign="middle">{item.dtAuctionStr} </td>
                                <td align="center" valign="middle">{item.dtAuctionTimeStr} </td>

                                <td align="center" valign="middle">
                                    { (item.status === 'A' || item.status === 'F') && (
                                        <div className="fw-bold text-success">{item.statusDescription}</div>
                                    )}
                                    { (item.status === 'P') && (
                                        <div className="fw-bold text-warning">{item.statusDescription}</div>
                                    )}
                                    { (item.status === 'C') && (
                                        <div className="fw-bold text-danger">{item.statusDescription}</div>
                                    )}

                                    {item.dtStatus && (
                                        <div>{item.dtStatusStr}</div>
                                    )}
                                </td>

                                <td align="left"   valign="middle">{item.address}</td>
                                <td align="left"   valign="middle">{item.city}</td>
                                <td align="center" valign="middle">{item.state}</td>
                                <td align="right"  valign="middle">{item.depositStr}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default AuctionList;