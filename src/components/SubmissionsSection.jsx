import React from 'react';
import { FaGoogleDrive } from 'react-icons/fa6';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import './SubmissionsSection.css';

const SubmissionsSection = () => {
  return (
    <section className="submissions-minimal-section" id="submissions">
      <div className="container submissions-minimal-container">
        <h3 className="submissions-minimal-title">Submissions</h3>
        <div className="submissions-btn-group">
          <a
            href="https://drive.google.com/drive/folders/1EMMF3aYlopR9Zl3TmO7EP76udWSQ5ijg?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="submissions-minimal-btn btn-experiments"
            aria-label="Experiments Google Drive Folder (opens in new tab)"
          >
            <FaGoogleDrive className="drive-icon" />
            <span>Experiments</span>
            <HiArrowTopRightOnSquare className="arrow-icon" />
          </a>
          <a
            href="https://drive.google.com/drive/folders/1P4dBIaD0rC76UIEUtqWzhgjmkqMF19MC?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="submissions-minimal-btn btn-assignments"
            aria-label="Assignments Google Drive Folder (opens in new tab)"
          >
            <FaGoogleDrive className="drive-icon" />
            <span>Assignments</span>
            <HiArrowTopRightOnSquare className="arrow-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubmissionsSection;
