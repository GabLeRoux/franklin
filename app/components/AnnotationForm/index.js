import { connect } from 'react-redux';
import * as actions from '../../modules/label';
import {
  clear as clearSelection,
  updateSelectionFrom,
  updateSelectionTo,
} from '../../modules/selection';
import AnnotationForm from './presenter';

function mapStateToProps(state) {
  const sequence = state.sequence;
  const label = state.label;
  const selection = state.selection;

  return {
    sequence: sequence.sequence,
    labels: label.labels,
    current: label.selectedAnnotation,
    selection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (labelId, annotation, annotationId) => {
      if (null !== annotationId) {
        dispatch(actions.updateAnnotation(labelId, annotationId, annotation));
      } else {
        dispatch(actions.createAnnotation(labelId, annotation));
      }

      dispatch(clearSelection());
    },
    updateSelectionFrom: (positionFrom) => {
      dispatch(updateSelectionFrom(positionFrom));
    },
    updateSelectionTo: (positionTo) => {
      dispatch(updateSelectionTo(positionTo));
    },
    onRemove: (labelId, annotationId) => {
      dispatch(actions.removeAnnotation(labelId, annotationId));
      dispatch(clearSelection());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);
