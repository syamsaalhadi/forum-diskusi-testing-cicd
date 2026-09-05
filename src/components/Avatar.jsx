function Avatar({ image, name, size = 'w-9 h-9' }) {
  return (
    <img
      src={image}
      alt={name}
      title={name}
      className={`${size} shrink-0 rounded-full border border-slate-200 object-cover bg-slate-100`}
      onError={(event) => {
        const target = event.currentTarget;
        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || '?')}&background=2457ff&color=fff`;
      }}
    />
  );
}

export default Avatar;
