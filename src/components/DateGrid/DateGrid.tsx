// @ts-nocheck
import React, {useState} from 'react';
import {Col, Layout, Card, Button} from 'antd'
import {cyan, geekblue, lime, magenta, purple, volcano} from "@ant-design/colors";
import {Calendar} from 'antd';
import type {CalendarProps} from 'antd';
import type {Dayjs} from 'dayjs';
import {IServiceStore} from "../../store/service-store.ts";
import {defaultUser} from "../../types/user.ts";

const {Content} = Layout

const DateGrid: React.FC<IServiceStore> = ({
                                               message,
                                               setMessage,
                                               serviceType,
                                               isBooking,
                                               setIsBooking,
                                               provider,
                                               appointments,
                                               currentAppointment,
                                               addAppointment,
                                               getOpenTimeslots,
                                               timeSlots
                                           }) => {

    console.log(isBooking)
    const colors = [volcano, lime, purple, geekblue, cyan]
    const [showTime, setShowTime] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid #FFF`,
        borderRadius: '20px',
        display: "block",
        margin: '0 auto',
    };

    const dateSelected = ({_d}) => {
        setMessage('')
        if (_d < new Date()) {
            setMessage('Time travel is impossible. Please select a future date.')
            return false;
        }
        console.log("we're here")
        setSelectedDate(_d)
        getOpenTimeslots(_d, serviceType)
        setShowTime(true)
        console.log(timeSlots)
    }

    const renderCalendarDay = (value: Dayjs) => {
        var appts = appointments?.filter((a) => (value.date() === parseInt(a.date.split('/')[1])))
        console.log(value.date(), appts)
        return (
            <ul className={"dailySchedule"}>
                {appts.map((item) => (
                    <li key={item.date}>
                        <Badge status={'default'} color={colors[serviceType]} text={item.date.split(' ')[1]}/>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <Col span={12}>
            <Card title={<div style={{margin: '0 25px'}}>When would you like to come in?</div>}
                  style={{
                      fontSize: '1.25rem',
                      justifyContent: 'center',
                      alignContent: 'center'
                  }}>
                <div style={{color: 'palevioletred'}}>{message}</div>
                <Layout>
                    <Content>
                        {(!isBooking && currentAppointment && provider) ?
                            <div style={{minWidth: '100%', margin: '0 25px', display: 'block'}}>
                                <h2>Your appointment with {provider?.profile?.name} is on:</h2>
                                <h4>{appointments[appointments.length - 1].date} @ {appointments[appointments.length - 1].time}</h4>
                            </div>
                            : showTime ?

                                <div style={wrapperStyle}>
                                    <h3>{selectedDate.toLocaleDateString('en-us')}</h3>
                                    {timeSlots.map((x, i) => {
                                        return <Button key={i} shape={'round'} onClick={(e) => {
                                            const arr = x.time.split(':')
                                            selectedDate.setHours(parseInt(arr[0]), parseInt(arr[1]))
                                            console.log('selectedDate', selectedDate)
                                            addAppointment({
                                                type: serviceType,
                                                date: `${selectedDate.toLocaleDateString('en-us')} ${x.time}`,
                                                patient: defaultUser,
                                                provider: provider
                                            })
                                            setShowTime(false)
                                            setIsBooking(false)
                                            console.log(appointments)
                                        }} disabled={!x.available}>{x.time}</Button>
                                    })}
                                    <Button type={'primary'} onClick={() => {
                                        setShowTime(false)
                                    }}>Pick another date</Button>
                                </div>
                                : isBooking &&
                                <div style={wrapperStyle}>
                                    <Calendar fullscreen={false} onSelect={dateSelected}/>
                                </div>
                        }

                    </Content>
                </Layout>
            </Card>
        </Col>
    );
};

export default DateGrid;
