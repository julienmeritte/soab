import React, {useEffect, useRef, useState} from "react";
import {useTexture} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {CARD_TYPE} from "../../enums/games-enum";

class Card extends React.Component {

    constructor(props) {
        super(props);

        this.color = props.color;
        this.type = props.type;
        this.number = props.number;
    }

    componentDidMount() {
        //setInterval(() => console.log(this.props.test), 500);
    }


    /***
     * ENFANT utilise une ref de lui-même pour s'automodifier.
     * On fait écouter la ref sur les props pour chopper des infos du parent en temps réel.
     */


    /*useFrame(() => {
        if (props.position[2] === -12) {
            setShouldRotate(true);
            props.position[2] = zAxis;
        }
        updateSelf();
        animationRotateSelf180();
    });*/
    onEnter(index, e) {
        e.stopPropagation();
        if (this.type !== CARD_TYPE.BLANK) {
            this.props.cardVisualize(this.props.texture[1], this.props.index)
        }
    }

    onLeave(index, e) {
        e.stopPropagation();
        if (this.type !== CARD_TYPE.BLANK) {
            this.props.cardVisualize(this.props.texture[0], this.props.index)
        }
    }

    render() {

        return (
            <mesh position={[this.props.position[0], this.props.position[1], this.props.position[2]]}
                  onClick={(e) => {
                      this.props.cardClick(this.props.index, this.props.type, e);
                  }}
                  rotation={[this.props.rotation[0], this.props.rotation[1], this.props.rotation[2]]}
                  onPointerOver={(e) => {
                      this.onEnter(this.props.index, e);
                  }}
                  onPointerOut={(e) => {
                      this.onLeave(this.props.index, e);
                  }}
            >
                <boxBufferGeometry attach="geometry"
                                   args={[this.props.properties.cardWidth, this.props.properties.cardHeight, 0.04]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[0]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[0]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[0]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[0]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[0]}/>
                <meshStandardMaterial attachArray="material" map={this.props.texture[1]}/>
            </mesh>
        );
    }

    /*click(e) {
        e.stopPropagation();
        props.cardClick(props.index);
        //rotateSelf180();
        //setShouldRotate(true);
    }

    updateSelf() {
        ref.current.position.x = props.position[0];
        ref.current.position.y = props.position[1];
        ref.current.position.z = props.position[2];
    }

    rotateSelf180() {
        if (ref.current.rotation.y === 0) {
            ref.current.rotation.y += Math.PI;
        } else {
            ref.current.rotation.y = 0;
        }
    }

    animationRotateSelf180() {
        if (shouldRotate) {
            if (rotateState === 0) {
                if (ref.current.rotation.y === 0) {
                    setZAxis(props.position[2]);
                }
                if (ref.current.rotation.y < Math.PI) {
                    if (ref.current.rotation.y < Math.PI / 2) {
                        props.position[2] += 0.5;
                    } else {
                        props.position[2] -= 0.5;
                    }
                    ref.current.rotation.y += 0.05;
                } else {
                    ref.current.rotation.y = Math.PI;
                    props.position[2] = zAxis;
                    setShouldRotate(false);
                    setRotateState(1)
                }
            } else if (rotateState === 1) {
                if (ref.current.rotation.y === Math.PI) {
                    setZAxis(props.position[2]);
                }
                if (ref.current.rotation.y > 0) {
                    if (ref.current.rotation.y > Math.PI / 2) {
                        props.position[2] += 0.5;
                    } else {
                        props.position[2] -= 0.5;
                    }
                    ref.current.rotation.y -= 0.05;
                } else {
                    ref.current.rotation.y = 0;
                    props.position[2] = zAxis;
                    setShouldRotate(false);
                    setRotateState(0)
                }
            }
        }
    }*/
}

export default Card;
