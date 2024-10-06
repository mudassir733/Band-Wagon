import React from 'react'
import styles from "./createShows.module.css"
import Image from 'next/image'
import penBorder from "../../../public/border_color.svg"
import MapComponent from '../map/MapComponent'
const CreateShows = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mid_section}>

                <div className={styles.create_page_container}>
                    <h3 className='heading_3_regular'>Create shows</h3>
                    <div className={styles.image_upload_box}>
                        <div>
                            <Image src={penBorder} />
                        </div>
                    </div>

                    <div className={styles.name_box}>
                        <div>
                            <p className='p_small_regular'>Name</p>
                        </div>
                        <div className={styles.input_box}>
                            <input type="text" placeholder='Andy' />
                        </div>
                    </div>

                    <div className={styles.bio_box}>
                        <div>
                            <span className='p_small_regular'>Bio</span>
                        </div>
                        <div className={styles.input_box}>
                            <input type="text" placeholder='It is a long established fact' />
                        </div>
                    </div>

                    <div className={styles.location_box}>
                        <div>
                            <span className='p_small_regular'>Location</span>
                        </div>
                        <div className={styles.input_box}>
                            <input type="text" placeholder='California, 23534' />
                        </div>


                    </div>
                    <div className={styles.map_box}>
                        <MapComponent />
                    </div>

                    <div className={styles.btn_box}>
                        <button>Create Show</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateShows