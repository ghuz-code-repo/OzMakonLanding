import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = () => {
    const { t } = useTranslation();



    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerRow}>
                    <div className={styles.footerTopLeft}>
                        <span className={styles.phone}>
                            <a href={`tel:${t('footer.phone').replace(/\s/g, "")}`}>{t('footer.phone')}</a>
                        </span>

                    </div>
                    <div className={styles.footerTopRight}>
                        <span className={styles.workingHours}>
                            {t('footer.workingHours')}<br />
                            {t('footer.workingHoursTimeMnFr')}<br />
                            {t('footer.workingHoursTimeSaSu')}
                        </span>
                    </div>
                </div>
                <div className={styles.footerRow}>
                    <div className={styles.footerBottomLeft}>
                        <span className={styles.href}>
                            <a href="https://gh.uz/news/vash-noviy-dom-nasha-zabota/" target="_blank">
                                {t('footer.departament')}
                            </a>
                        </span>
                        <span className={styles.copanyName}>
                            {t('footer.companyName').split('|').map((line, i) => (
                                i === 0 ? (
                                    <React.Fragment key={i}>
                                        {line}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={i}>
                                        <a href="https://gh.uz">{line}</a>
                                    </React.Fragment>
                                )
                            ))}
                        </span>
                        <span className={styles.copyright}>
                            {t('footer.copyright')}
                        </span>
                    </div>
                    <div className={styles.footerBottomRight}>
                        <span className={styles.adress}>
                            {t('footer.adress')}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;