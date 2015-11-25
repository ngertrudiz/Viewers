Template.viewerMain.helpers({
    'toolbarOptions': function() {
        var toolbarOptions = {};

        var buttonData = [];

        buttonData.push({
            id: 'resetViewport',
            title: 'Reset Viewport',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-undo'
        });

        buttonData.push({
            id: 'wwwc',
            title: 'WW/WC',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-sun-o'
        });

        buttonData.push({
            id: 'zoom',
            title: 'Zoom',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-search'
        });

        buttonData.push({
            id: 'pan',
            title: 'Pan',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-arrows'
        });

        buttonData.push({
            id: 'stackScroll',
            title: 'Stack Scroll',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-bars'
        });

        buttonData.push({
            id: 'lesion',
            title: 'Target Tool',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-arrows-alt'
        });

        buttonData.push({
            id: 'nonTarget',
            title: 'Non-Target Tool',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-long-arrow-up'
        });

        buttonData.push({
            id: 'clearTools',
            title: 'Clear tools',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-trash'
        });

        toolbarOptions.buttonData = buttonData;
        toolbarOptions.includePlayClipButton = false;
        toolbarOptions.includeLayoutButton = false;
        toolbarOptions.includeHangingProtocolButtons = false;
        return toolbarOptions;
    }
});

Template.viewerMain.events({
    'click button#clearTools': function(e, template) {
        var patientId = template.data.studies[0].patientId;
        var toolTypes = ["lesion", "nonTarget"];
        var toolState = cornerstoneTools.globalImageIdSpecificToolStateManager.toolState;
        var toolStateKeys = Object.keys(toolState).slice(0);

        // Set null array for toolState data found by imageId and toolType
        toolStateKeys.forEach(function (imageId) {
            toolTypes.forEach(function (toolType) {
                var toolTypeData = toolState[imageId][toolType];
                if(toolTypeData && toolTypeData.data.length > 0) {
                    if(toolTypeData.data[0].patientId === patientId) {
                        toolState[imageId][toolType] = {
                            data: []
                        };
                    }
                }
            });
        });

        // Update imageViewerViewport elements to remove lesions on current image
        $(".imageViewerViewport").each(function(viewportIndex, element) {
            cornerstone.updateImage(element);
        });

        // Remove patient's measurements
        Meteor.call('removeMeasurementsByPatientId', patientId);

    }

});