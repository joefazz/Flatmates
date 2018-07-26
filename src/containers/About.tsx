import React from 'react';
import { ScrollView, Text, Image } from "react-native";
import logo from '../../Assets/box.png';
import { toConstantWidth } from '../utils/PercentageConversion';
import { FontFactory } from '../consts/font';

export class About extends React.PureComponent {
    static navigationOptions = () => ({
        title: 'About'
    });

    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
                <Image source={logo} style={{ width: toConstantWidth(60), height: toConstantWidth(60) }} />
                <Text style={{ ...FontFactory() }}>Hi! Thanks for downloading my app!{"\n"}
                    Flatmates was born after 2 years of what I'd call 'house hell'
                    where housemates would drop out and finding replacements would suck,

                    {"\n"}{"\n"}Flatmates is designed to be a replacement for the Facebook groups that are often run by students union.
                    I was disappointed by the lack of structure the current solutions offered, some houses not even
                    listing the price to rent per month!. I started coding it in November 2017 about
                    5 minutes after watching "The Social Network". It is the product of many hundreds of hours
                    of work and experience.{"\n"}{"\n"}

                    The aim of Flatmates is not to make money, at the moment the app costs me about £50 a month to maintain
                    (not including labour). I charge for additional applications in the hope that the app can break even eventually.
                    If you are in desperate need of a house and can't really afford spending money on micro-transactions, please email
                    me with the subject "Need Applications" so I can respond to you as soon as possible.{"\n"}{"\n"}

                    Please email me at <Text style={{ ...FontFactory({ weight: 'Bold' }) }}>joseph@fazzino.net</Text> with any feedback, ideas, happy thoughts etc.{"\n"}{"\n"}
                </Text>

                <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 16, alignSelf: 'flex-start' }}>About the developer.</Text>
                <Text style={{ ...FontFactory() }}>
                    Joe Fazzino is currently a 3rd year Computer Science student at the University of Reading.
                    While doing a placement year at Fluid.Work developing and maintaining their iOS and Android applications,
                    he came up with the idea for Flatmates. He is currently still developing Flatmates while working full time
                    and in the planning phase of his final project which is a website that lets users sign up and start
                    learning new skills from other users.{"\n"}{"\n"}
                </Text>

                <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 16, alignSelf: 'flex-start' }}>About the app.</Text>
                <Text style={{ ...FontFactory() }}>
                    Flatmates is built using React Native, a technology created by Facebook which lets you write an application for
                    Android, iOS and other platforms using JavaScript code. Without this technology, Flatmates could only exist on one platform
                    (probably Android).{"\n"}{"\n"}

                    Flatmates originally was quite different. Originally the plan was to use the Facebook Login API to get information about
                    users in order to help them match with other houses. This was abandoned after the Cambridge Analytica scandal for 3 reasons.{"\n"}{"\n"}
                    1. Users aren't so happy to login with Facebook after that{"\n"}
                    2. Facebook greatly restricted the access developers have making it almost useless{"\n"}
                    3. How many people actually like the things they like anyway?!{"\n"}{"\n"}

                    Flatmates took almost 9 months to develop (while working a full time development job). A visual history of my code additions/deletions can be
                    found below (try and guess where I took holidays and where I started saying to myself "it'll be done by the end of the month").
                </Text>
                <Image />
            </ScrollView>
        );
    }
}