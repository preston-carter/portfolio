// Create root element for React
const root = ReactDOM.createRoot(document.getElementById('pipeline-viz'));

// Pipeline Stage Component
const PipelineStage = ({ title, icon, color, isActive, onClick }) => {
    return React.createElement('div', {
        onClick: onClick,
        className: `
      w-28 h-28 
      rounded-full 
      flex flex-col items-center justify-center 
      cursor-pointer 
      transition-all duration-500
      ${color} 
      ${isActive ? 'scale-110 shadow-xl ring-4 ring-blue-300' : 'hover:scale-105 hover:shadow-lg'}
      relative
      z-10
    `
    }, [
        React.createElement('div', { className: 'text-2xl mb-2', key: 'icon' }, icon),
        React.createElement('div', { className: 'text-sm font-semibold text-center', key: 'title' }, title),
        isActive && React.createElement('div', {
            className: 'absolute inset-0 rounded-full animate-ping opacity-25 bg-blue-400',
            key: 'ping'
        })
    ]);
};

// Pipeline Component
const Pipeline = () => {
    const [activeStage, setActiveStage] = React.useState(null);

    const stages = [
        {
            title: 'Extract',
            fullTitle: 'Data Extraction',
            icon: '🌍',
            color: 'bg-blue-100',
            description: 'Python script extracts celestial body data from Solar System OpenData API with daily automated updates via GitHub Actions.'
        },
        {
            title: 'Load',
            fullTitle: 'Raw Data Layer',
            icon: '💾',
            color: 'bg-green-100',
            description: 'Raw JSON data loaded into BigQuery staging tables, preserving original structure with auto-detected schema.'
        },
        {
            title: 'Transform',
            fullTitle: 'Transformation Layer',
            icon: '⚙️',
            color: 'bg-yellow-100',
            description: 'Dataform creates standardized Planet and Moon tables with proper relationships and field mappings.'
        },
        {
            title: 'Quality',
            fullTitle: 'Data Quality',
            icon: '✔️',
            color: 'bg-purple-100',
            description: 'Automated assertions validate physical properties, relationships, and data integrity across all tables.'
        },
        {
            title: 'Analytics',
            fullTitle: 'Analytics Layer',
            icon: '📊',
            color: 'bg-indigo-100',
            description: 'Statistical analysis and aggregated metrics of planetary systems prepared for visualization and reporting.'
        }
    ];

    return React.createElement('div', {
        className: 'p-8 bg-white rounded-xl shadow-lg max-w-6xl mx-auto'
    }, [
        React.createElement('div', {
            className: 'flex items-center justify-between mb-8 relative',
            key: 'stages'
        }, stages.map((stage, index) => React.createElement(React.Fragment, { key: stage.title }, [
            React.createElement(PipelineStage, {
                key: `stage-${index}`,
                title: stage.title,
                icon: stage.icon,
                color: stage.color,
                isActive: activeStage === index,
                onClick: () => setActiveStage(activeStage === index ? null : index)
            }),
            index < stages.length - 1 && React.createElement('div', {
                className: 'flex-grow mx-0 relative',
                style: { margin: '0 -10px' },
                key: `connector-${index}`
            }, React.createElement('div', {
                className: 'h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full relative overflow-hidden'
            }, React.createElement('div', {
                className: 'absolute inset-0'
            }, React.createElement('div', {
                className: 'absolute top-0 left-0 w-full h-full flex items-center'
            }, React.createElement('div', {
                className: 'w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 animate-flow'
            })))))
        ]))),
        activeStage !== null && React.createElement('div', {
            className: 'bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-500 animate-fade-in',
            key: 'description'
        }, [
            React.createElement('h3', {
                className: 'text-xl font-bold mb-3 text-gray-800',
                key: 'title'
            }, stages[activeStage].fullTitle),
            React.createElement('p', {
                className: 'text-gray-600 mb-4',
                key: 'desc'
            }, stages[activeStage].description)
        ])
    ]);
};

// Render the Pipeline component
root.render(React.createElement(Pipeline));