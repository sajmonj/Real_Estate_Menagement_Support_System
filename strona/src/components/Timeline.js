import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/Timeline.css';

const TimelineItem = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="timeline__item">
            <div className="timeline__item-header">
                <button className="timeline__arrow" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                    <FontAwesomeIcon icon={faChevronDown} className={`timeline__arrow-icon ${isExpanded ? 'expanded' : ''}`} />
                </button>
                <span className="timeline__dot"></span>
                <span className="timeline__meta">
                    <time className="timeline__date">{event.date}</time><br />
                    <strong className="timeline__title">{event.title}</strong>
                </span>
            </div>
            {isExpanded && (
                <div className="timeline__item-body">
                    <div className={`timeline__item-body-content ${isExpanded ? 'expanded' : ''}`}>
                        <p className="timeline__item-p">{event.description}</p>
                        {event.amount && (
                            <p className="timeline__item-p"><strong>Kwota: </strong>{event.amount} PLN</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TimelineItem;

