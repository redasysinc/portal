/* tslint.disable */
// @ts-nocheck
// @ts-ignore
import React, {useEffect, useState} from 'react'
import {Row, Col, Layout, Card, List, Button} from 'antd'
import ProviderMapbox from "../Mapbox/ProviderMapbox.tsx";
import {consecutiveUniqueRandom} from "unique-random";
import {ClockCircleTwoTone, PhoneTwoTone} from "@ant-design/icons";
import DateGrid from '../DateGrid/DateGrid'
import useServiceStore from "../../store/service-store.ts";
import therapists, {preamble} from "./therapists.ts";
import AOS from 'aos';
import 'aos/dist/aos.css';

const {Content, Header, Footer, Sider} = Layout

function Service({service, providerIndex}) {
    const {
        message,
        setMessage,
        healthCheck,
        serviceType,
        setServiceType,
        provider,
        setProvider,
        isBooking,
        setIsBooking,
        currentAppointment,
        appointments,
        addAppointment,
        resetAppointment,
        timeSlots,
        getOpenTimeslots
    } = useServiceStore()
    const random = consecutiveUniqueRandom(0, therapists.length - 1);
    const selectMapItem = (e) => {
        const v = therapists[random()]
        console.log(v)
        setProvider(v)
    }
    const ds = therapists.slice(0, 5).map(x => {
        return x.profile.name
    })

    useEffect(() => {
        setServiceType(service)
        if (!message) {
            //healthCheck()
        }

    }, [message]);

    return (
        <>
            <Row>
                <Col span={(isBooking || (!isBooking && currentAppointment)) ? 12 : 24}>
                    {provider ?
                        <Card style={{
                            fontSize: '1.25rem',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Layout>
                                <Content>
                                    <p>{provider.profile.name}</p>
                                    <p>{provider.profile.company}</p>
                                    <p>{provider.profile.address}</p>
                                </Content>
                                <Footer>
                                    <div>
                                        <Button style={{marginRight: '30px'}} type={'danger'} onClick={() => {
                                            setProvider(null)
                                            setIsBooking(false)
                                            resetAppointment()
                                        }}>Reset</Button>
                                        <Button style={{marginRight: '30px'}} type={'primary'} onClick={() => {
                                            console.log('click')
                                            setIsBooking(true)
                                        }}><ClockCircleTwoTone/>Continue</Button>

                                    </div>
                                </Footer>
                            </Layout>
                        </Card> :
                        <Card style={{
                            fontSize: '1.75rem',
                            margin: '0 auto 0 5px'
                        }}>{preamble(service)}</Card>}
                </Col>
                {(isBooking || (!isBooking && currentAppointment)) &&
                    <DateGrid
                        message={message}
                        setMessage={setMessage}
                        serviceType={service} isBooking={isBooking} setIsBooking={setIsBooking}
                        provider={provider}
                        appointments={appointments}
                        currentAppointment={currentAppointment}
                        addAppointment={addAppointment}
                        getOpenTimeslots={getOpenTimeslots}
                        timeSlots={timeSlots}/>
                }
            </Row>
            <Row gutter={0}>
                <Col span={24}>
                    <Layout>
                        <Sider>
                            <Card style={{minWidth: '30vw', minHeight: '100%'}} title={'Choose one below:'}>
                                <List dataSource={ds}
                                      renderItem={item => (
                                          <div style={{marginBottom: '15px', fontWeight: 500}} onClick={() => {
                                              setProvider(therapists.filter(x => (x.profile.name === item))[0])
                                          }}>{item}</div>
                                      )}
                                />
                            </Card>
                        </Sider>
                        <Content>
                            <Card title={'Or, find a provider near you'} style={{minWidth: '100%'}}>
                                <ProviderMapbox selectMapItem={selectMapItem}/>
                            </Card>
                        </Content>
                    </Layout>
                </Col>
            </Row>
        </>
    )
}


export default Service;
