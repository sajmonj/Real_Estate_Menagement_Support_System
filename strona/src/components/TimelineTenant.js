import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import '../style/Timeline.css';
import {Button} from "react-bootstrap";


const TimelineItem = ({ tenant, apartmentId, openEditTenantModal }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div className="timeline__item">
            <div className="timeline__item-header">
                <button className="timeline__arrow" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                    <FontAwesomeIcon icon={faChevronDown} className={`timeline__arrow-icon ${isExpanded ? 'expanded' : ''}`} />
                </button>
                <span className="timeline__dot"></span>
                <span className="timeline__meta">
                    <time className="timeline__date">{tenant.startDate} - {tenant.endDate}</time><br/>
                    <strong className="timeline__title">{tenant.firstName} {tenant.lastName} </strong>
                    {!tenant.endDate || new Date(tenant.endDate) >= new Date() ?
                        <FaCheckCircle style={{ color: 'green' }} /> :
                        <FaMinusCircle style={{ color: 'red' }} />
                    }
                </span>
            </div>
            {isExpanded && (
                <div className="timeline__item-body">
                    <div className={`timeline__item-body-content ${isExpanded ? 'expanded' : ''}`}>
                        <p className="timeline__item-p">Phone nr:
                            &nbsp;&nbsp;&nbsp;&nbsp;{tenant.phone}</p>
                        <p className="timeline__item-p">Email:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tenant.email}</p>
                        <p className="timeline__item-p">Address:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tenant.address}</p>
                        <p className="timeline__item-p">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {tenant.postalCode} {tenant.city}</p>
                        <p className="timeline__item-p">Partnership:&nbsp;&nbsp;{tenant.startDate}&nbsp;-&nbsp;{tenant.endDate}</p>
                        <p className="timeline__item-p">Documents:&nbsp;&nbsp;
                            {tenant.documents.map((document, index) => (
                                <div key={index}>
                                    <a href={URL.createObjectURL(document)} target="_blank" rel="noopener noreferrer">
                                        {document.name}
                                    </a>
                                    <br/>
                                </div>
                            ))}
                        </p>
                        <Button variant="primary" onClick={() => openEditTenantModal(tenant)}>Edit tenant</Button>                        <br/>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TimelineItem;

