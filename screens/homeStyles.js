import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FF',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionLarge: {
    backgroundColor: '#4DA6FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 32,
  },
  subtext: {
    fontSize: 14,
    color: 'white',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureButton: {
    flex: 1,
    backgroundColor: '#4DA6FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 5,
  },
  emoji: {
    fontSize: 24,
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    color: 'white',
  },
  sectionMedium: {
    backgroundColor: '#4DA6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 13,
    color: 'white',
  },
  sectionLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles; // ✅ 이거 추가!
