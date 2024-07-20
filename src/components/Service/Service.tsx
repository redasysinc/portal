import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Layout, List, Row} from 'antd'
import {cyan, geekblue, lime, purple, volcano} from "@ant-design/colors";
import ProviderMapbox from "../Mapbox/ProviderMapbox.tsx";
import {consecutiveUniqueRandom} from "unique-random";
import {ClockCircleTwoTone} from "@ant-design/icons";
import DateGrid from '../DateGrid/DateGrid'
import useServiceStore from "../../store/service-store.ts";
import {preamble} from "./therapists.ts";
import 'aos/dist/aos.css';
import {AppointmentType, stringValue} from "../../types/appointment.ts";
import {changeAntdTheme} from "mini-dynamic-antd-theme";

const {Content, Footer, Sider} = Layout

interface ServiceProps {
    service: AppointmentType
}

const setTheme = (type: AppointmentType): void => {
    switch (type) {
        case AppointmentType.therapy:
            changeAntdTheme(volcano[6])
            break;
        case AppointmentType.support:
            changeAntdTheme(lime[6])
            break;
        case AppointmentType.mental:
            changeAntdTheme(purple[6])
            break;
        case AppointmentType.family:
            changeAntdTheme(geekblue[6])
            break;
        case AppointmentType.primary:
            changeAntdTheme(cyan[6])
            break;
        default:
            changeAntdTheme('#77dd66')
            break;
    }
}

const Service: React.FC<ServiceProps> = ({service}) => {

    const
        {
            message,
            setMessage,
            serviceType,
            setServiceType,
            provider,
            providers,
            getProviders,
            setProvider,
            isBooking,
            setIsBooking,
            currentAppointment,
            appointments,
            getAppointments,
            addAppointment,
            timeSlots,
            getOpenTimeslots
        } = useServiceStore() || {}
    const [therapists, setTherapists] = useState(providers || [])
    const getRandom = () => (consecutiveUniqueRandom(0, therapists?.length - 1))

    const selectMapItem = () => {
        const random = getRandom()
        const i = random()
        console.log(i)
        const v = therapists[i]
        console.log(v)
        setProvider(v)
    }


    const ds = therapists?.slice(0, 5).map(x => {
        return x.profile.name
    })


    useEffect(() => {
        if (setServiceType instanceof Function) {
            setServiceType(service)
        }
        if (appointments && !appointments?.length) {
            getAppointments('GCappelli')
        }
        if (!message) {
            //healthCheck()
        }
        setTheme(service)

        const load = async () => {
            await getProviders()
        }

        if (!providers?.length) load()


    }, [serviceType, setServiceType, provider, setProvider, service]);

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
                                        <Button style={{marginRight: '30px'}} type={'text'} onClick={() => {
                                            setProvider(null)
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
                        }}>{preamble(stringValue(service))}</Card>}
                </Col>
                {(isBooking || (!isBooking && currentAppointment)) &&
                    <DateGrid
                        message={message}
                        setMessage={setMessage}
                        serviceType={service}
                        isBooking={isBooking} setIsBooking={setIsBooking}
                        provider={provider}
                        appointments={appointments}
                        getAppointments={getAppointments}
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
                                              const p = therapists.filter(x => (x.profile.name === item))[0]
                                              console.log(item)
                                              setProvider(p)
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
