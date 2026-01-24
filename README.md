<div align="center">
<h1>ARBot: ARBot: A High-Fidelity Robotic Manipulator Teleoperation Framework for Human-Centered Augmented Reality Evaluation</h1>

[**Harsh Chhajed**](https://sites.google.com/view/harshchhajed)<sup>1</sup> · [**Tian Guo**](https://tianguo.info/)<sup>2</sup>

Worcester Polytechnic Institute

</div>

<div align="center">
  <p style="background-color: #f0f8ff; padding: 10px; border-radius: 5px; width:40%" >
  📢 We will release the full dataset once the paper gets accepted!
  </p>

<img width="1612" height="534" alt="image" src="https://github.com/user-attachments/assets/593633c6-6bcd-4844-a2a7-b40159c7187b" />

Repository Structure:
ARBot
├── README.md
├── LICENSE
├── AR-PiPER                     # Robot Control Interface Submodule for PiPER
├── AR-OMX                       # Robot Control Interface Submodule for Open Manipulator X
├── AR-CV                        # Submodule for Computer Vision + IMU Control
├── ARPose                       # Submodule for ARPose Application
└── Dataset                      # User Study Results
    ├── Subset_A                 # Tracing Fidelity
    │   ├── AR                   # Tracing Fidelity Results using ARPose Application
    │   │   ├── U1
    │   │   │   ├── Circle.csv
    │   │   │   ├── S.csv
    │   │   │   └── Square.csv 
    │   │   ├── U2
    │   │   └── . . .
    │   └── CV                  # Tracing Fidelity Results using CV+IMU Setup
    │       ├── U1
    │       │   ├── Circle.csv
    │       │   ├── S.csv
    │       │   └── Square.csv 
    │       ├── U2
    │       └── . . .
    └── Subset_B                 # Repeatability
        ├── AR                   # Repeatability Results using ARPose Application
        │   ├── U1
        │   │   ├── H1.csv
        │   │   ├── H2.csv
        │   │   ├── H3.csv
        │   │   ├── robot_1.csv
        │   │   ├── robot_2.csv
        │   │   ├── robot_3.csv
        │   │   ├── robot_4.csv
        │   │   └── robot_5.csv 
        │   ├── U2
        │   └── . . .
        └── CV                  # Repeatability Results using CV+IMU Setup
            │   ├── H1.csv
            │   ├── H2.csv
            │   ├── H3.csv
            │   ├── robot_1.csv
            │   ├── robot_2.csv
            │   ├── robot_3.csv
            │   ├── robot_4.csv
            │   └── robot_5.csv 
            ├── U2
            └── . . .
