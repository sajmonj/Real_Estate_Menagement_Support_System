import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/Timeline.css';

const TimelineItem = ({ event }) => {
    console.log(event);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="timeline__item">
            <div className="timeline__item-header">
                <button className="timeline__arrow" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                    <FontAwesomeIcon icon={faChevronDown} className={`timeline__arrow-icon ${isExpanded ? 'expanded' : ''}`} />
                </button>
                <span className="timeline__dot"></span>
                <span className="timeline__meta">
                    <time className="timeline__date">{event.startDate} - {event.endDate}</time><br />
                    <strong className="timeline__title">{event.firstName} {event.lastName}</strong>
                </span>
            </div>
            {isExpanded && (
                <div className="timeline__item-body">
                    <div className={`timeline__item-body-content ${isExpanded ? 'expanded' : ''}`}>
                        <p className="timeline__item-p">Phone nr:
                            &nbsp;&nbsp;&nbsp;&nbsp;{event.phone}</p>
                        <p className="timeline__item-p">Email:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{event.email}</p>
                        <p className="timeline__item-p">Address:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{event.address}</p>
                        <p className="timeline__item-p">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {event.postalCode} {event.city}</p>
                        <p className="timeline__item-p">Partnership:&nbsp;&nbsp;{event.startDate}&nbsp;-&nbsp;{event.endDate}</p>
                        <p className="timeline__item-p">Documents:&nbsp;&nbsp;
                            <a href={event.documents} target="_blank" rel="noopener noreferrer">
                                {`${event.documents}`}
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TimelineItem;

