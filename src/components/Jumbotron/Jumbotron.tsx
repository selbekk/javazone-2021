import React, {lazy, Suspense, useEffect} from 'react';
import styles from './Jumbotron.module.scss';
import {useCanPlayVideoType} from '../../core/hooks/UseCanPlayVideoType';
import Link from "../Link/Link";

const VideoSource = lazy(() => import('./VideoSource'));

interface JumbotronProps {
    title?: string;
    subTitle?: string;
    subsubTitle?: string;
    location?: string;
}

export function Jumbotron(props: JumbotronProps) {

    const canPlayWebm = useCanPlayVideoType('webm');
    useEffect(() => {
        const vid = document.getElementById('backgroundLapse') as HTMLVideoElement;
        vid.play();
    });

    return (
        <div className={styles.jumbotron}>
            <Suspense fallback={<img src="splash.png" alt="loading"/>}>
                <video preload="auto" playsInline autoPlay muted loop className={styles.poster} id="backgroundLapse">
                    <VideoSource canPlayWebm={canPlayWebm}/>
                    Your browser does not support HTML5 video.
                </video>
            </Suspense>
            <div className={styles.jumbotronContent}>
                <img className={styles.logo} src="logo-sharp.svg" alt="logo"/>
                <div className={styles.info}>
                    <h1>{props.title}</h1>
                    <h2>{props.subTitle}</h2>
                    <h2>{props.location}</h2>
                    <h3 className={styles.subsubTitle}>{props.subsubTitle}</h3>
                    <p>Following the latest updates from the government and
                        the local authorities regarding the Omicron variant of COVID-19 it’s no longer possible to carry out the conference as planned in Oslo Spektrum.</p>
                    <p>Read more about the changes here:</p>
                    <Link classNames={styles.covidLink} color="pink" url="/corona">JavaZone & Corona</Link>
                </div>
            </div>
        </div>
    )
}
